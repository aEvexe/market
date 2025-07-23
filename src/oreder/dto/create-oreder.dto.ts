import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateOrederDto {
  @Field()
  @IsInt()
  total_price: number;

  @Field()
  @IsInt()
  remaining_price: number;

  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => Int)
  @IsInt()
  storeId: number;

  @Field(() => Int)
  @IsInt()
  dermantinId: number;
}
