import { ArrayMaxSize, Length, MaxLength } from "class-validator";

import { InputType, Field } from "type-graphql";

@InputType()
export class createContentBlockArgs {
  @Field()
  _id: string;
  @Field()
  type: string;
  @Field()
  color: string;
  @Field()
  parent_quest: string;
}
