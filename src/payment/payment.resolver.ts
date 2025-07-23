// src/payment/payment.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(@Args('createPaymentDto') createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Query(() => [Payment])
  payments() {
    return this.paymentService.findAll();
  }

  @Query(() => Payment)
  payment(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findOne(id);
  }

  @Mutation(() => Payment)
  updatePayment(@Args('updatePaymentDto') updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(updatePaymentDto.id, updatePaymentDto);
  }

  @Mutation(() => Boolean)
  removePayment(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.remove(id);
  }
}
