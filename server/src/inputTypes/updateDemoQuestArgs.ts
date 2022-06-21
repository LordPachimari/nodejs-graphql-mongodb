import { ArrayMaxSize, Length, MaxLength } from "class-validator";
import { ContentBlocksToInsert } from "./insertArgs";
import { ContentBlockInput } from "./contentBlockInput";

import { InputType, Field } from "type-graphql";

@InputType()
export class updateDemoQuestArgs {
  @Field()
  demoQuestId: number;
  @Field(() => [String])
  contentBlockIdsToDelete: string[];
  @Field(() => [ContentBlockInput])
  contentBlocksToUpdate: ContentBlockInput[];
  @Field(() => [ContentBlocksToInsert])
  contentBlocksToInsert: ContentBlocksToInsert[];
}
