import { ApiProperty } from "@nestjs/swagger";
import { Order } from '../../../modules/orders/entities/order.entity';
import { Product } from "../../../modules/Products/product.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orderDetails',
})
export class OrderDetail {
  
  @ApiProperty({
    type: String,
    description: "Unique identifier for the order detail",
    example: uuid(), // Example value
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    type: Number,
    description: "Price of the order detail",
    example: 29.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    type: Order,
    description: "Order associated with the order detail",
  })
  @OneToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;

  @ApiProperty({
    type:Array<Product>,
    description: "List of products associated with the order detail",
  })
  @ManyToMany(() => Product, (product) => product.orderDetails, { onDelete: 'CASCADE' })
  products: Product[];
}
