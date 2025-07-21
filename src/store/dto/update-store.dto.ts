import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateStoreDto } from './create-store.dto';

@InputType()
export class UpdateStoreDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  logo_url?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  region_id?: number;

  @Field(() => Int, { nullable: true })
  rating_id?: number;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => Int, { nullable: true })
  managerId?: number;
}

