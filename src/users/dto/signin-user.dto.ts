import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SigninUserDto {
  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  password: string;
}

