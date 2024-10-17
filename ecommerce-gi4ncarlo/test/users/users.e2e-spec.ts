import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { hash } from "bcrypt";
import { AppModule } from "src/app.module";
import { User } from "src/modules/Users/user.entity";
import { UserService } from "src/modules/Users/users.service";
import { TypeOrmTestModule } from "test/typeorm-testing-config";
import * as request from "supertest";

describe("Users (e2e)", () => {
    let app: INestApplication;
    let authToken: string;
    let userService: UserService;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, TypeOrmTestModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        userService = moduleFixture.get<UserService>(UserService);

        const hashedPassword = await hash("123456", 10);

        jest.spyOn(userService, "findUserByEmail").mockImplementation(async (email) => {
            if (email === "pepe@gmail.com") {
                return Promise.resolve({
                    id: "550e8400-e29b-41d4-a716-446655440001",
                    email: "pepe@gmail.com",
                    password: hashedPassword,
                    administrador: "admin"
                } as User);
            } else {
                return Promise.resolve(undefined);
            }
        });

        jest.spyOn(userService, "getAllUsers").mockImplementation(async () => {
            return Promise.resolve([{
                id: "550e8400-e29b-41d4-a716-446655440001",
                email: "pepe@gmail.com",
                administrador: "admin"
            }] as User[]);
        });

        jest.spyOn(userService, "findOneById").mockImplementation(async (id) => {
            if (id === "550e8400-e29b-41d4-a716-446655440001") {
                return Promise.resolve({
                    id: "550e8400-e29b-41d4-a716-446655440001",
                    email: "pepe@gmail.com",
                    administrador: "admin"
                } as User);
            }
            return undefined;
        });

        const loginResponse = await request(app.getHttpServer())
            .post("/auth/signin")
            .send({
                email: "pepe@gmail.com",
                password: "123456",
            });

        authToken = loginResponse.body["token"];
    });

    afterEach(async () => {
        await app.close();
    });

    it("/users (GET) should return an array with users", async () => {
        const response = await request(app.getHttpServer())
            .get("/users")
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toBeInstanceOf(Array);
    });


    it("/users/:id (DELETE) should delete a user by id", async () => {
        const response = await request(app.getHttpServer())
            .delete("/users/550e8400-e29b-41d4-a716-446655440001")
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(HttpStatus.OK);
    });

    it("/auth/signin (POST) should login and return a token", async () => {
        const response = await request(app.getHttpServer())
            .post("/auth/signin")
            .send({
                email: "pepe@gmail.com",
                password: "123456",
            });

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body).toHaveProperty("token");
    });
});
