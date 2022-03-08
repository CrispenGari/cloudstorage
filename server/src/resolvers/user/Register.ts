import { UserContext } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { RegisterInput } from "./InputTypes/RegisterInput";
import { RegisterObjectType } from "./ObjectTypes/RegisterObjectType";

import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "@crispengari/regex-validator";
import argorn2 from "argon2";
import { User } from "../../entities/User/User";
import { generateVerificationCode } from "@crispengari/random-verification-codes";
import { sendEmail } from "../../utils";
import {
  __confirm__email__prefix,
  __maxVerificationAge__,
} from "../../constants";
import { Profile } from "../../entities/Profile/Profile";
import { confirmEmailTemplate } from "../../utils/templates";

@Resolver()
export class RegisterResolver {
  @Mutation(() => RegisterObjectType)
  async register(
    @Ctx() { redis }: UserContext,
    @Arg("input", () => RegisterInput)
    { email, password, username }: RegisterInput
  ): Promise<RegisterObjectType> {
    username = username.trim().toLocaleLowerCase();
    email = email.trim().toLocaleLowerCase();
    if (!isValidUsername(username)) {
      return {
        error: {
          field: "username",
          message: "invalid username.",
        },
      };
    }
    if (!isValidEmail(email)) {
      return {
        error: {
          field: "email",
          message: "invalid email address.",
        },
      };
    }
    if (!isValidPassword(password)) {
      return {
        error: {
          field: "password",
          message:
            "password must be at least 8 characters with at least 1 letter and 1 number.",
        },
      };
    }
    if (await User.findOne({ where: { username } })) {
      return {
        error: {
          message: "username is already taken.",
          field: "username",
        },
      };
    }
    if (await User.findOne({ where: { email } })) {
      return {
        error: {
          message: "email address is already in use.",
          field: "email",
        },
      };
    }

    const hashedPassword = await argorn2.hash(password);

    const profile = await Profile.create({
      email,
      username,
    }).save();

    const user = await User.create({
      password: hashedPassword,
      username,
      email,
      profile,
    }).save();

    const verificationCode = await generateVerificationCode(6);
    const emailTemplate = confirmEmailTemplate(user, verificationCode);
    await sendEmail(
      email,
      emailTemplate,
      "Account Creation Confirmation Code - Cloud Storage"
    );

    // Create a user don't set the session until they confirmed their email
    // req.session.userId = user.id;
    const token: string = __confirm__email__prefix + username;
    await redis.setex(token, __maxVerificationAge__, verificationCode);
    return { user: user };
  }
}
