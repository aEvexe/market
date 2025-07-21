import { CreateDermantinImageDto } from './create-dermantin-image.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDermantinImageDto extends PartialType(CreateDermantinImageDto) {
  @Field(() => Int)
  id: number;
}
