import { __confirm__email__prefix } from "../../constants";

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { RegisterObjectType } from "./ObjectTypes/RegisterObjectType";
import { UserContext } from "../../types";
import { User } from "../../entities/User/User";

@Resolver()
export class VerifyEmailResolver {
  @Mutation(() => RegisterObjectType)
  async confirm(
    @Ctx() { req, redis }: UserContext,
    @Arg("token", () => String) token: string,
    @Arg("verificationCode", () => String) verificationCode: string
  ): Promise<RegisterObjectType> {
    //   token -> prefix:username
    const username: string = token.split(":")[1];
    const code = await redis.get(token);
    if (code === null) {
      return {
        error: {
          field: "code",
          message: "could not find the verification code for that username.",
        },
      };
    }
    if (code !== verificationCode) {
      return {
        error: {
          field: "code",
          message: "invalid verification code.",
        },
      };
    }
    const user = await User.findOne({ username });
    if (!user) {
      return {
        error: {
          field: "username",
          message: "failed to verify the user for unknown reason.",
        },
      };
    }
    await redis.del(token);
    user.confirmed = true;
    user.isLoggedIn = true;
    req.session.userId = user.uid;
    await user.save();
    return {
      user,
    };
  }
}
