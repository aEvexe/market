import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateHistoryDto {
  @Field(() => Int)
  dermantin_id: number;

  @Field(() => Int)
  user_id: number;
}
