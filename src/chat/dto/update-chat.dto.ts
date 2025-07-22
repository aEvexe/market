import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateChatDto {
  @Field(() => Int, { nullable: true })
  user_id?: number;

  @Field(() => Int, { nullable: true })
  store_id?: number;
}
