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
import argon2 from "argon2";
import { getConnection } from "typeorm";
import path from "path";
import { unlinkSync } from "fs";
import { __cookieName__, ___server__base__url__ } from "../../constants";
import { Profile } from "../../entities/Profile/Profile";
@InputType()
class DeleteAccountInput {
  @Field(() => String, { nullable: false })
  password: string;
  @Field(() => String, { nullable: false })
  email: string;
}

@ObjectType()
class DeleteAccountError {
  @Field(() => String, { nullable: false })
  field: string;

  @Field(() => String, { nullable: false })
  message: string;
}

@ObjectType()
class DeleteAccountObjectType {
  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => DeleteAccountError, { nullable: true })
  error?: DeleteAccountError;
}
@Resolver()
export class DeleteAccount {
  @Mutation(() => DeleteAccountObjectType, { nullable: false })
  async deleteAccount(
    @Ctx() { req, res }: UserContext,
    @Arg("input")
    { email, password }: DeleteAccountInput
  ): Promise<DeleteAccountObjectType> {
    const user = await getConnection()
      .getRepository(User)
      .findOne({
        where: { email: email.trim().toLowerCase() },
        relations: [
          "profile",
          "musics",
          "documents",
          "pictures",
          "videos",
          "miscellaneous",
          "trash",
        ],
      });
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
      password.trim()
    );
    if (!correct) {
      return {
        error: {
          field: "password",
          message: "invalid password for this account.",
        },
        success: false,
      };
    }

    //  delete storage data for the user

    user?.documents?.forEach(async (doc) => {
      const { url } = doc;
      const doc_path = url.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${doc_path}`);
      await unlinkSync(abs_path);
    });
    user?.trash?.forEach(async (trash) => {
      const { url } = trash;
      const trash_path = url.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${trash_path}`);
      await unlinkSync(abs_path);
    });
    user?.musics?.forEach(async (music) => {
      const { url } = music;
      const music_path = url.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${music_path}`);
      await unlinkSync(abs_path);
    });
    user?.videos?.forEach(async (video) => {
      const { url } = video;
      const video_path = url.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${video_path}`);
      await unlinkSync(abs_path);
    });
    user?.miscellaneous?.forEach(async (miscellaneous) => {
      const { url } = miscellaneous;
      const miscellaneous_path = url.replace(
        `${___server__base__url__}/api/`,
        ""
      );
      const abs_path = path.join(__dirname, `../../../${miscellaneous_path}`);
      await unlinkSync(abs_path);
    });
    user?.pictures?.forEach(async (pictures) => {
      const { url } = pictures;
      const pictures_path = url.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${pictures_path}`);
      await unlinkSync(abs_path);
    });

    // Delete the user banner and avatar

    if (user?.profile?.banner) {
      const { banner } = user.profile;
      const banner_path = banner.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${banner_path}`);
      await unlinkSync(abs_path);
    }

    if (user?.profile?.avatar) {
      const { avatar } = user.profile;
      const avatar_path = avatar.replace(`${___server__base__url__}/api/`, "");
      const abs_path = path.join(__dirname, `../../../${avatar_path}`);
      await unlinkSync(abs_path);
    }

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Profile)
      .where({
        id: user.profile.id,
      })
      .execute();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where({
        email: email.trim().toLowerCase(),
      })
      .execute();

    await new Promise((resolve, reject) => {
      req.session.destroy((error: any) => {
        res.clearCookie(__cookieName__);
        if (error) {
          return reject(false);
        } else {
          return resolve(true);
        }
      });
    });

    return {
      success: true,
    };
  }
}
