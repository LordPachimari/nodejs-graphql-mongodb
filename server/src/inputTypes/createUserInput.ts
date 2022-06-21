import { ArrayMaxSize, Length, MaxLength } from "class-validator";

import { InputType, Field } from "type-graphql";

@InputType()
export class createUserInput {
  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @Length(5, 40)
  user_secret: string;
}
