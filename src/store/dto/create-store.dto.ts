import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateStoreDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  logo_url?: string;

  @Field(() => Int)
  region_id: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  rating_id: number;

  @Field()
  status: 'ACTIVE' | 'INACTIVE';

  @Field(() => Int)
  managerId: number;
}
