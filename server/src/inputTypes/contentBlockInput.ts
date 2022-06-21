import { RichText } from "./rich_text";
import { InputType, Field } from "type-graphql";

@InputType()
export class ContentBlockInput {
  @Field()
  _id: string;
  @Field(() => [RichText])
  rich_text: RichText[];
}
