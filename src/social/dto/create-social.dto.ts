// src/social/dto/create-social.dto.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateSocialDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  type: string; 

  @Field()
  @IsString()
  link: string;

  @Field(() => Int)
  @IsInt()
  storeId: number;
}
