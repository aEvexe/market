import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateRequestDto {
  @Field()
  text: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  status: string;
}
