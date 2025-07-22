import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateMessageDto {

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  is_read?: boolean;
}
