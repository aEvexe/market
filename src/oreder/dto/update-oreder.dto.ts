import { PartialType } from '@nestjs/mapped-types';
import { CreateOrederDto } from './create-oreder.dto';
import { Field, Int } from '@nestjs/graphql';

export class UpdateOrederDto extends PartialType(CreateOrederDto) {
    @Field(() => Int)
  id: number;
}
