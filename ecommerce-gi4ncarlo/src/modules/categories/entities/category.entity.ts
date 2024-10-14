import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/modules/Products/product.entity';

@Entity({
  name: 'categories',
})
export class Category {
  
  @ApiProperty({
    type: String,
    description: "Unique identifier for the category",
    example: "eebf07e1-0987-4c8e-b6b2-d327888f2e67", 
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: "Name of the category",
    example: "Electronics", 
  })
  @Column()
  name: string;

  @ApiProperty({
    type: () => [Product],
    description: "List of products associated with the category",
  })
  @OneToMany(() => Product, (product) => product.category, { eager: true }) // Agregando eager para cargar automáticamente los productos relacionados
  products: Product[]; // Cambiado a Product[]
}
