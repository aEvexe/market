// src/payment/payment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Oreder } from '../oreder/entities/oreder.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Oreder)
    private readonly orderRepository: Repository<Oreder>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepository.findOne({ where: { id: dto.orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const payment = this.paymentRepository.create({
      amount: dto.amount,
      method: dto.method,
      status: dto.status,
      order,
    });

    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['order'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id }, relations: ['order'] });
    if (!payment) throw new NotFoundException(`Payment with ID ${id} not found`);
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (dto.orderId) {
      const order = await this.orderRepository.findOne({ where: { id: dto.orderId } });
      if (!order) throw new NotFoundException('Order not found');
      payment.order = order!;
    }

    Object.assign(payment, dto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<number> {
    await this.paymentRepository.delete(id)
    return id
  }
}
