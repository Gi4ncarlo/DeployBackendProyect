import { OrderDetail } from "src/modules/order-details/entities/order-detail.entity";
import { User } from "src/modules/Users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid} from "uuid"

@Entity({
    name : "orders"
})
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id : string = uuid();
   
    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column()
    date : Date;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    @JoinColumn() // Necesario para definir la columna que contiene la clave foránea
    orderDetail: OrderDetail;

}
