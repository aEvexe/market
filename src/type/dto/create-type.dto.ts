import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTypeDto {
  @Field()
  type: string;
}
