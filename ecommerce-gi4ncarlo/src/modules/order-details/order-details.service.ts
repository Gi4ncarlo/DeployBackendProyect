import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  // Método para crear un nuevo detalle de la orden
  async create(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    // Crear la entidad OrderDetail a partir del DTO
    const orderDetail =
     this.orderDetailsRepository.create(createOrderDetailDto);

    // Guardar la entidad en la base de datos
    const savedOrderDetail =
      await this.orderDetailsRepository.save(orderDetail);

    // Retornar el detalle de la orden creado
    return savedOrderDetail;
  }

  async findAll() {
    return await this.orderDetailsRepository.find();
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  async remove(id: string) {
    return await this.orderDetailsRepository.delete(id)
  }

  async findOne(id : string) : Promise<OrderDetail>{

    return await this.orderDetailsRepository.findOneBy({id})
  }

  async findOneByOrderId(
    orderId: string,
    relations: string[] = [],
  ): Promise<OrderDetail[]> {
    return await this.orderDetailsRepository.find({
      where: { order: { id: orderId } },
      relations: relations,
    });
  }
}
