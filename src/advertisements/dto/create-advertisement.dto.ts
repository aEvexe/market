import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAdvertisementDto {
  @Field(() => Int)
  discount_percent: number;

  @Field()
  type: 'PERCENT' | 'FIXED';

  @Field()
  status: 'ACTIVE' | 'INACTIVE';

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;

  @Field(() => Int)
  dermantin_id: number;
}
