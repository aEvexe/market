// src/social/dto/update-social.dto.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSocialDto } from './create-social.dto';

@InputType()
export class UpdateSocialDto extends PartialType(CreateSocialDto) {
  @Field(() => Int)
  id: number;
}
