import { Field, InputType } from "type-graphql";
import { Annotations } from "./annotations";

@InputType()
export class RichText {
  @Field()
  text: string;
  @Field(() => Annotations)
  annotations: Annotations;
}
