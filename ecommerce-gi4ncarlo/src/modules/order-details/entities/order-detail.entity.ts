import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/Products/product.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orderDetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  price : number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn()
  order: Order;


  @ManyToMany(() => Product, (product) => product.orderDetails)
  products: Product[];

}
