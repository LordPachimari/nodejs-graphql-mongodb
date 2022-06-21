import { Field, InputType } from "type-graphql";

@InputType()
export class Annotations {
  @Field()
  bold: string;
  @Field()
  textColor: string;
}
