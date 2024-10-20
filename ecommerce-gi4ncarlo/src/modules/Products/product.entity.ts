import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from '../categories/entities/category.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';


@Entity({
  name: 'products',
})
export class Product {
  
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the product',
    example: uuid(), // Example value
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the product',
    example: 'Shampoo',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the product',
    example: 'A high-quality hair shampoo',
  })
  @Column()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Price of the product',
    example: 19.99,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Stock available for the product',
    example: 50,
  })
  @Column()
  stock: number;

  @ApiProperty({
    type: String,
    description: 'Image URL of the product',
    required: false,
    example: 'http://example.com/image.jpg',
  })
  @Column({ nullable: true })
  imgUrl: string;

  @ApiProperty({
    type: () => Category,
    description: 'Category to which the product belongs',
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    type: () => [OrderDetail],
    description: 'Order details associated with the product',
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable() // Necessary to define the join table in ManyToMany relations
  orderDetails: OrderDetail[];

}
