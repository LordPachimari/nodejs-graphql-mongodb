import { Field, ObjectType } from "type-graphql";
import { Quest } from "./quest";
import { User } from "./user";

@ObjectType()
export class Guild {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  guild_master: User;
  @Field()
  guild_creator: User;
  @Field()
  category: string;
  @Field()
  subcategory: string;

  @Field()
  level: number;
  @Field()
  experience: number;
  @Field()
  reputation: number;

  @Field(() => [User])
  solvers: User[];
  @Field(() => [Quest])
  quests_posted: Quest[];
  @Field(() => [Quest])
  quests_attempted: Quest[];

  @Field()
  creationDate: Date;
}
