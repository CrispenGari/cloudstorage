import { User } from "../../entities/User/User";
import { UserContext } from "../../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";

import { isValidPassword } from "@crispengari/regex-validator";
import argon2 from "argon2";
import { __reset__password__link__prefix } from "../../constants";

@InputType()
class ChangePasswordInput {
  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@ObjectType()
class ChangePasswordError {
  @Field(() => String, { nullable: false })
  field: string;

  @Field(() => String, { nullable: false })
  message: string;
}

@ObjectType()
class ChangePasswordObjectType {
  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => ChangePasswordError, { nullable: true })
  error?: ChangePasswordError;
}
@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => ChangePasswordObjectType, { nullable: false })
  async changePassword(
    @Ctx() { redis }: UserContext,
    @Arg("input") { token, username, password }: ChangePasswordInput
  ): Promise<ChangePasswordObjectType> {
    const user = await User.findOne({ username });
    if (!user) {
      return {
        error: {
          field: "username",
          message: "invalid username.",
        },
        success: false,
      };
    }
    const saved_token: string = __reset__password__link__prefix + user.username;
    const redis_token = await redis.get(saved_token);

    if (redis_token !== token && redis_token === null) {
      return {
        error: {
          field: "token",
          message: "invalid token, or the reset password link has expired.",
        },
        success: false,
      };
    }
    if (!isValidPassword(password.trim())) {
      return {
        error: {
          field: "password",
          message:
            "password must be at least 8 characters with at least 1 letter and 1 number.",
        },
        success: false,
      };
    }
    const correct: boolean = await argon2.verify(
      user.password,
      password.trim()
    );
    if (correct) {
      return {
        error: {
          field: "password",
          message:
            "you can not use this password as your new password, because this password is currently in use with your account.",
        },
        success: false,
      };
    }
    const hashedPassword = await argon2.hash(password);
    await redis.del(saved_token);
    user.password = hashedPassword;
    await user.save();
    return {
      success: true,
    };
  }
}
