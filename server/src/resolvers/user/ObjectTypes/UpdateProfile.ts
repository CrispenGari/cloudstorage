import { User } from "../../../entities/User/User";
import { ObjectType, Field } from "type-graphql";
import { AuthError } from "./AuthError";

@ObjectType()
export class UpdateProfileObjectType {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => AuthError, { nullable: true })
  error?: AuthError;
}
