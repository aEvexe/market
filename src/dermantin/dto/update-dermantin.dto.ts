import { PartialType } from '@nestjs/mapped-types';
import { CreateDermantinDto } from './create-dermantin.dto';
import { Field, Float, Int } from '@nestjs/graphql';

export class UpdateDermantinDto extends PartialType(CreateDermantinDto) {
  @Field(() => Int, {nullable: true})
  store_id: number;

  @Field({nullable: true})
  name: string;

  @Field(() => Float, {nullable: true})
  price: number;

  @Field(() => Float, {nullable: true})
  rating: number;

  @Field({nullable: true})
  class: 'A' | 'B' | 'C';

  @Field(() => Int, {nullable: true})
  categoryId: number;
}
