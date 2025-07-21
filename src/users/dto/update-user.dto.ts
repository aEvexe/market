import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ObjectType, Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  refresh_token?: string;
}
