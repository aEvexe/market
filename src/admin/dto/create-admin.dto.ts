import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateAdminDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsBoolean()
  is_active: boolean;

  @Field()
  @IsBoolean()
  is_creator: boolean;
}
