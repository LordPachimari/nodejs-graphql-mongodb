import { InputType, Field } from "type-graphql";
import { ContentBlockInput } from "./contentBlockInput";
import { RichText } from "../inputTypes/rich_text";
@InputType()
export class ContentBlocksToInsert {
  @Field()
  contentBlock: ContentBlockInput;
  @Field()
  position: number;
}
//
