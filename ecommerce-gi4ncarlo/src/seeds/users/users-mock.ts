import { Role } from "src/modules/Users/enum/role.enum";

export const usersMock = [
    {
        name: "Administrador",
        email: "admin@gmail.com",
        password: "123456",
        confirmPassword: "123456",
        phone: "5566443",
        country: "Argentina",
        address: "La administradora 123",
        city: "Santa Rosa",
        administrador: Role.Admin,

    },
    {
        name: "Pepe",
        email: "pepe@gmail.com",
        password: "123456",
        confirmPassword: "123456",
        phone: "51231532",
        country: "España",
        address: "9 de Julio",
        city: "Madrid",
        administrador: Role.User,
    },
    {
        name: "Martina",
        email: "martina@gmail.com",
        password: "123456",
        confirmPassword: "123456",
        phone: "55325467",
        country: "Italia",
        address: "Giulio di cesare",
        city: "Roma",
        administrador: Role.User,
    },
]