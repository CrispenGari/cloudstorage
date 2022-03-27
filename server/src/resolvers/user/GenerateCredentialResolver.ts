import { UserContext } from "../../types";
import { Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";

import { Error } from "./ObjectTypes/UpdateUserObjectType";
import { User } from "../../entities/User/User";
import { v4 as uid_v4 } from "uuid";

@ObjectType()
class GenerateCredentialsResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;

  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@Resolver()
export class GenerateCredentialsResolver {
  @Mutation(() => GenerateCredentialsResponse)
  async generateCredentials(
    @Ctx() { req }: UserContext
  ): Promise<GenerateCredentialsResponse> {
    const user = await User.findOne({
      where: { uid: req.session.userId },
      relations: ["profile"],
    });
    if (!user) {
      return {
        error: {
          message: "failed to find the user.",
          field: "user",
        },
        success: false,
      };
    }
    // Generate or regenerate user API KEY and API SECRETE
    user.apiKey = uid_v4();
    user.apiSecretKey = uid_v4();
    await user.save();
    return {
      success: true,
    };
  }
}
