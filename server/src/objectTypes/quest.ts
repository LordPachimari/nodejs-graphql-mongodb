import { Field, ObjectType } from "type-graphql";
import { ContentBlock } from "./content-block";

@ObjectType()
export class Quest {
  @Field(() => String)
  _id: string;
  @Field()
  created_by: string;

  @Field(() => [String])
  contentIds: string[];

  @Field(() => [ContentBlock], { nullable: true })
  content: ContentBlock[] | null;
  @Field()
  creationDate: Date;

  @Field()
  updatedAt: Date;
}
