import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRequestDto } from './create-request.dto';

@InputType()
export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @Field()
  id: number;
}
