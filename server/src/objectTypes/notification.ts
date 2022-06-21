import { Field, ObjectType } from "type-graphql";
import { Quest } from "./quest";
import { User } from "./user";

@ObjectType()
export class Notification {
  @Field()
  _id: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => [Notification])
  notifications: Notification[];

  @Field()
  creationDate: Date;
}
