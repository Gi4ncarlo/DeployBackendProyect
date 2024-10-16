import { Injectable } from '@nestjs/common';
import { CreateOrderDto, ProductId } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserService } from '../Users/users.service';
import { productsService } from '../Products/products.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';
import { OrderResponseDto } from './dto/response-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly productService: productsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const user = await this.userService.findOneById(userId);

    const order = { 
      user: user,
      date: new Date(),
    };

    const orderEntity = await this.ordersRepository.save(
      this.ordersRepository.create(order),
    );

    const total = await this.calculateTotal(products);

    const orderDetail = new CreateOrderDetailDto();

    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderEntity;

    const orderDetailEntity = await this.orderDetailsService.create(orderDetail);

    return new OrderResponseDto(orderDetailEntity);
  }

  private async calculateTotal(products : Array<ProductId>) : Promise<number>{
    let total = 0;
    for(const product of products) {
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const order = await this.ordersRepository.findOneBy({ id });
      const orderDetail = await this.orderDetailsService.findOneByOrderId(
        order.id,
        ["products", "order"]
      )
    
    return orderDetail
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
