import { UserContext } from "../../types";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../../entities/User/User";
import { isValidEmail } from "@crispengari/regex-validator";
import {
  __maxResetPasswordLinkAge__,
  __reset__password__link__prefix,
} from "../../constants";
import { v4 as uuid_v4 } from "uuid";
import { sendEmail } from "../../utils";
import { resetPasswordEmailTemplate } from "../../utils/templates";

@ObjectType()
class ForgotPasswordEmail {
  @Field(() => String, { nullable: false })
  field: string;

  @Field(() => String, { nullable: false })
  message: string;
  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@Resolver()
export class RequestForgotPasswordEmailResolver {
  @Mutation(() => ForgotPasswordEmail, { nullable: false })
  async sendForgotPasswordEmail(
    @Ctx() { redis }: UserContext,
    @Arg("email", () => String) email: string
  ): Promise<ForgotPasswordEmail> {
    if (!isValidEmail(email.trim().toLowerCase())) {
      return {
        field: "email",
        message: `${email.toLowerCase().trim()} is an invalid email address.`,
        success: false,
      };
    }
    const user = await User.findOne({ email });
    if (!user) {
      return {
        field: "email",
        success: false,
        message: `the email address ${email
          .toLowerCase()
          .trim()} does not exists.`,
      };
    }
    const token: string = __reset__password__link__prefix + user.username;
    const pwd_token = uuid_v4();

    const emailTemplate = resetPasswordEmailTemplate(user, pwd_token);
    await sendEmail(email, emailTemplate, "RESET PASSWORD - Cloud Storage");
    await redis.setex(token, __maxResetPasswordLinkAge__, pwd_token);
    return {
      field: "email",
      message: `the password reset link has been sent to your email address: ${email
        .trim()
        .toLowerCase()}`,
      success: true,
    };
  }
}
