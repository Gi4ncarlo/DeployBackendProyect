import { Test, TestingModule } from "@nestjs/testing";
import { authController } from "./Auth.controller";
import { UserService } from "../Users/users.service";
import {hash} from "bcrypt"
import { User } from "../Users/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { signUpUserDto } from "../Users/Dtos/SignUpUserDto.dto";
import { SignInUserDto } from "../Users/Dtos/SignInUserDto.dto";
import { UserResponseDto } from "../Users/Dtos/response.user.dto";
import { authService } from "./Auth.service";

describe("AuthController", () => {
    let controller: authController;

    beforeEach(async () => {
       const hashedPassword = await hash("123456", 10);
       const mockUserService: Partial<UserService> = {
        findUserByEmail: (email : string) => {
            if(email === "pepe@gmail.com") {
                return Promise.resolve({
                    email: "pepe@gmail.com",
                    password: hashedPassword,
                    administrador : "user",
                } as User);
            }else{
                return Promise.resolve(undefined)
            }
        },
        createUser: (entityLike?: Partial<User>): Promise<User> => 
            Promise.resolve({
                ...entityLike,
                administrador: "user",
                id: "1234fs-1234fs-1234fs-1234fs",
            } as User)
       }

       const module: TestingModule = await Test.createTestingModule({
        controllers : [authController],
        providers: [authService,
            {provide: getRepositoryToken(User), useValue: {} },
            {provide: JwtService, useValue: {signAsync: ()=> Promise.resolve("mockJwtToken")},
        },
        {
            provide: UserService,
            useValue: mockUserService
        },
        ],
       }).compile();

       controller = module.get<authController>(authController)
    });

    const mockSignUpUser = new signUpUserDto({
        name: "Pruebas pruebitas",
        password: "123456",
        passwordConfirm: "123456",
        email : "pruebas@gmail.com",
        address: "Fake pepe 12",
        phone: "123123123"
    })

    const mockSignInUser = new SignInUserDto({
        email: "pepe@gmail.com",
        password: "123456"
    })

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("signUp() should return a new userResponseDto and create User", async () => {
        const user = await controller.signUp(mockSignUpUser);

        expect(user).toBeDefined()
        expect(user).toBeInstanceOf(UserResponseDto)
        expect(user).toHaveProperty("id")
    });

    it("signIn() should return a token", async () => {
        const token = await controller.loginAuth(mockSignInUser);
        console.log("Token : ", token);
        expect(token).toBeDefined();
        expect(token).toHaveProperty("token");
        
    })

    it("signUp() should throw an error if email is already in use", async () => {
        const mockSignUpExistingUser = new signUpUserDto({
            name: "User",
            password: "123456",
            passwordConfirm: "123456",
            email: "pepe@gmail.com",  // correo existente
            address: "Fake Address",
            phone: "123123123"
        });
    
        await expect(controller.signUp(mockSignUpExistingUser)).rejects.toThrow("El usuario ya existe.");
    });

    it("signIn() should throw an error if email or password is incorrect", async () => {
        const mockInvalidSignInUser = new SignInUserDto({
            email: "wrongemail@gmail.com",
            password: "wrongpassword"
        });
    
        await expect(controller.loginAuth(mockInvalidSignInUser)).rejects.toThrow("User not found");
    });
    
    
})