import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid"
import { Order } from "../orders/entities/order.entity";

@Entity({
    name : "users",
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id : string = uuid();

    @Column()
    name : string;

    @Column({ unique : true})
    email : string;

    @Column()
    password : string;

    @Column()
    phone : string;

    @Column({nullable : true})
    country : string;

    @Column()
    address : string;

    @Column({ nullable : true})
    city : string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}