import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  logo: string;
}
