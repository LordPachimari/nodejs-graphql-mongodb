import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Annotations {
  bold: string;
  textColor: string;
}
