import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  fullname: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  password: string;

  @Field()
  @IsEnum(['admin', 'user', 'moderator']) // or whatever your role types are
  role: string;

  @Field()
  @IsEnum(['north', 'south', 'east', 'west']) // example values
  region: string;

  @Field()
  @IsEnum(['en', 'fr', 'es', 'de']) // example
  lang: string;

  @Field()
  is_verified: number;
}
