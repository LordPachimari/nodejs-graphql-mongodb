import { Field, ObjectType } from "type-graphql";
import { Annotations } from "./annotations";

@ObjectType()
export class RichText {
  text: string;
  annotations: Annotations;
}
