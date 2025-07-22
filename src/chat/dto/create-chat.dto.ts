import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateChatDto {
  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  store_id: number;
}
