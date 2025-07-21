import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDermantinImageDto {
  @Field()
  image_url: string;

  @Field({ defaultValue: false })
  is_main: boolean;

  @Field(() => Int)
  dermantinId: number;
}
