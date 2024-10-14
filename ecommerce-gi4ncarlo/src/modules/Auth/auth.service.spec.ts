import { Test, TestingModule } from "@nestjs/testing";
import { authService } from "./Auth.service";
import { UserService } from "../Users/users.service";
import { User } from "../Users/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { signUpUserDto } from "../Users/Dtos/SignUpUserDto.dto";
import { Role } from "../Users/enum/role.enum";

describe("AuthService", () => {
    let service: authService;

    beforeEach(async () => {
        const mockUserService: Partial<UserService> = {
            findUserByEmail: () => Promise.resolve(undefined),
            createUser: (entityLike?: Partial<User>) =>
                Promise.resolve({
                    ...entityLike,
                    administrador: "user",
                    id: "1234fs-1234fs-1234fs-1234fs"
                } as User)
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [authService, 
                { provide: getRepositoryToken(User), useValue: {}},
                { provide: JwtService, useValue: {}},
                { provide: UserService, useValue: mockUserService}
            ],
            
        }).compile();

        service = module.get<authService>(authService);
    })

    const mockUser = new signUpUserDto({
        name: "Pepe Argento",
        password: "123456",
        passwordConfirm: "123456",
        email : "pepe@gmail.com",
        address: "Fake pepe 12",
        phone: "123123123"
    })

    it("should be defined", () => {
        expect(service).toBeDefined();
    })

    it("signUp() crete a new user with encrypted password", async () => {
        const user = await service.signUp(mockUser);
        console.log(user);
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("administrador", Role.User);
        expect(user).toHaveProperty("password");

    })

    
})