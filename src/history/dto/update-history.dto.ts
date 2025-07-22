import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateHistoryDto {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  dermantin_id?: number;

  @Field(() => Int, { nullable: true })
  user_id?: number;
}
