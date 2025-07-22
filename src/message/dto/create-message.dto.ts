import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMessageDto {
  @Field()
  text: string;

  @Field()
  is_read: boolean;

  @Field(() => Int)
  chatId: number;
}
