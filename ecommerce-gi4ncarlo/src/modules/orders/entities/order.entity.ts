
import { ApiProperty} from "@nestjs/swagger";
import { OrderDetail } from "src/modules/order-details/entities/order-detail.entity";
import { User } from "src/modules/Users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity({
    name: "orders",
})
export class Order {

    @ApiProperty({
        type: String,
        description: "Unique identifier for the order",
        example: uuid(),
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();

    @ApiProperty({
        type: () => User,
        description: "User who placed the order",
    })
    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ApiProperty({
        type: String,
        description: "Date when the order was placed",
        example: "2023-09-30T14:48:00.000Z", // ISO date format
    })
    @Column()
    date: Date;

    @ApiProperty({
        type: () => OrderDetail,
        description: "Details of the order",
    })
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    @JoinColumn() // Necessary to define the column that contains the foreign key
    orderDetail: OrderDetail;
}
