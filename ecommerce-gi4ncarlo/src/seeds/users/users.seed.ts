import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/modules/Users/user.entity"
import { Repository } from "typeorm"
import { usersMock } from "./users-mock"
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeed {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,

    ){}

    async seed () {
        const existingUserEmails = (await this.userRepository.find()).map(
            (user) => user.email
        )
       // Itera sobre los usuarios en el mock y guarda si no existen
       for (const userData of usersMock) {
        if (!existingUserEmails.includes(userData.email)) {
            const user = new User();
            user.name = userData.name;
            user.email = userData.email;
            user.password = await bcrypt.hash(userData.password, 10);
            user.phone = userData.phone;
            user.address = userData.address;
            user.city = userData.city;
            user.country = userData.country;
            user.administrador = userData.administrador;
            await this.userRepository.save(user); // Guarda el usuario si no existe
        }
    }
}
}