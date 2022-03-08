import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Error {
  @Field(() => String)
  field: string;
  @Field(() => String)
  message: string;
}
@ObjectType()
export class UpdateUserObjectType {
  @Field(() => Error, { nullable: true })
  error?: Error;
  @Field(() => Boolean, { nullable: true })
  success: boolean;
}
