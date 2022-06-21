import { ArrayMaxSize, Length, MaxLength } from "class-validator";

import { InputType, Field } from "type-graphql";

@InputType()
export class createQuestArgs {
  @Field()
  _id: string;
  @Field(() => [String])
  blockIds: string[];
}
