import { ArrayMaxSize, Length, MaxLength } from "class-validator";

import { InputType, Field } from "type-graphql";

@InputType()
export class redactQuestArgs {
  @Field()
  _id: string;
  @Field(() => [String])
  blockIds: string[];
}
