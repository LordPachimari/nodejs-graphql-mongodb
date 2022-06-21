import { Field, ObjectType } from "type-graphql";
import { Quest } from "./quest";
import { Notification } from "./notification";

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  username: string;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  phone_number: number;
  @Field()
  account_type: string;
  @Field()
  balance: number;
  @Field()
  biography: string;
  @Field()
  avatar_link: string;
  @Field()
  level: number;
  @Field()
  experience: number;
  @Field(() => [String])
  categories: string[];
  @Field(() => [String])
  subcategories: string[];
  @Field(() => [String])
  achievements: string[];
  @Field()
  major: string;

  @Field(() => [Quest])
  quests_posted: Quest[];
  @Field(() => [Quest])
  quests_attempted: Quest[];
  @Field(() => [Notification])
  notifications: Notification[];

  @Field()
  creationDate: Date;
}
