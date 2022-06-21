import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DemoQuest {
  @Field()
  _id: string;
  @Field(() => [String])
  content: string[];

  @Field()
  creationDate: Date;

  @Field()
  updatedAt: Date;
}
