import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePaymentDto } from './create-payment.dto';

@InputType()
export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @Field(() => Int)
  id: number;
}
