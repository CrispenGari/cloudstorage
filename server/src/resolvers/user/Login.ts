import { UserContext } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { LoginObjectType } from "./ObjectTypes/LoginObjectType";
import { LoginInput } from "./InputTypes/LoginInput";
import { isValidEmail } from "@crispengari/regex-validator";
import argon2 from "argon2";
import { User } from "../../entities/User/User";
import { getConnection } from "typeorm";
@Resolver()
export class LoginResolver {
  @Mutation(() => LoginObjectType)
  async login(
    @Ctx() { req }: UserContext,
    @Arg("input", () => LoginInput) { password, usernameOrEmail }: LoginInput
  ): Promise<LoginObjectType> {
    usernameOrEmail = usernameOrEmail.trim().toLocaleLowerCase();
    const isThisEmail = await isValidEmail(usernameOrEmail);
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: usernameOrEmail })
      .orWhere("user.username = :username", { username: usernameOrEmail })
      .leftJoinAndSelect("user.profile", "profile")
      .getOne();

    if (!user) {
      return {
        error: {
          field: isThisEmail ? "email" : "username",
          message: isThisEmail ? "invalid email address." : "invalid username",
        },
      };
    }
    const correct: boolean = await argon2.verify(user.password, password);
    if (!correct) {
      return {
        error: {
          field: "password",
          message: "invalid password",
        },
      };
    }
    if (user.confirmed !== true) {
      return {
        error: {
          field: "confirmation",
          message: "this account has not yet been confirmed.",
        },
      };
    }
    req.session.userId = user.uid;
    user.isLoggedIn = true;
    const _user = await user.save();
    return {
      user: _user,
    };
  }
}
