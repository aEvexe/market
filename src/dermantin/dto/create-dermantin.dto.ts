import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateDermantinDto {
  @Field(() => Int)
  store_id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rating: number;

  @Field()
  class: 'A' | 'B' | 'C';

  @Field(() => Int)
  categoryId: number;
}