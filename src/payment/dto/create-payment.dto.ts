import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsEnum } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

@InputType()
export class CreatePaymentDto {
  @Field()
  @IsInt()
  amount: number;

  @Field(() => PaymentMethod)
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @Field(() => PaymentStatus)
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @Field(() => Int)
  @IsInt()
  orderId: number;
}
