import { ObjectType, Field } from "type-graphql";
import { RichText } from "./rich_text";
@ObjectType()
export class ContentBlock {
  @Field()
  _id: string;
  @Field(() => [RichText])
  rich_text: RichText[];
}
