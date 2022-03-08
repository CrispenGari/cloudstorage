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
@InputType()
class ChangePasswordSettingInput {
  @Field(() => String, { nullable: false })
  oldPassword: string;
  @Field(() => String, { nullable: false })
  newPassword: string;
  @Field(() => String, { nullable: false })
  confirmPassword: string;
}

@ObjectType()
class ChangePasswordSettingError {
  @Field(() => String, { nullable: false })
  field: string;

  @Field(() => String, { nullable: false })
  message: string;
}

@ObjectType()
class ChangePasswordSettingObjectType {
  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => ChangePasswordSettingError, { nullable: true })
  error?: ChangePasswordSettingError;
}
@Resolver()
export class ChangePasswordSetting {
  @Mutation(() => ChangePasswordSettingObjectType, { nullable: false })
  async changePasswordSetting(
    @Ctx() { req }: UserContext,
    @Arg("input")
    { confirmPassword, newPassword, oldPassword }: ChangePasswordSettingInput
  ): Promise<ChangePasswordSettingObjectType> {
    const user = await User.findOne(req?.session?.userId);
    if (!user) {
      return {
        error: {
          field: "user",
          message: "you are not authenticated.",
        },
        success: false,
      };
    }

    const correct: boolean = await argon2.verify(
      user.password,
      oldPassword.trim()
    );
    if (!correct) {
      return {
        error: {
          field: "password",
          message: "invalid old password",
        },
        success: false,
      };
    }
    if (newPassword.trim() === oldPassword.trim()) {
      return {
        error: {
          field: "password",
          message:
            "you can not use this password as your new password, because this password is currently in use with your account.",
        },
        success: false,
      };
    }
    if (confirmPassword.trim() !== newPassword.trim()) {
      return {
        error: {
          field: "password",
          message: "the two password must match.",
        },
        success: false,
      };
    }

    if (!isValidPassword(newPassword.trim())) {
      return {
        error: {
          field: "password",
          message:
            "password must be at least 8 characters with at least 1 letter and 1 number.",
        },
        success: false,
      };
    }
    const hashedPassword = await argon2.hash(newPassword.trim());
    user.password = hashedPassword;
    await user.save();
    return {
      success: true,
    };
  }
}
