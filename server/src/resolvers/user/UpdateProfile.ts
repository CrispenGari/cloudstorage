import { UserContext } from "../../types";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";

import {
  __confirm__email__prefix,
  __maxVerificationAge__,
  ___server__base__url__,
} from "../../constants";
import { UpdateInput } from "./InputTypes/UpdateInput";
import { User } from "../../entities/User/User";
import { v4 as uuid_v4 } from "uuid";
import { createWriteStream, unlinkSync } from "fs";
import path from "path";
import { Profile } from "../../entities/Profile/Profile";

import {
  isValidEmail,
  isValidPhoneNumber,
  isValidUsername,
} from "@crispengari/regex-validator/lib";
import { Error } from "./ObjectTypes/UpdateUserObjectType";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@ObjectType()
class UpdateProfileResponse {
  @Field(() => Error, { nullable: true })
  error?: Error;

  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@Resolver()
export class UpdateProfileResolver {
  @Mutation(() => UpdateProfileResponse)
  async updateProfile(
    @Ctx() { req }: UserContext,
    @Arg("input", () => UpdateInput)
    { email, username, phoneNumber }: UpdateInput,
    @Arg("avatar", () => GraphQLUpload, { nullable: true })
    avatarUpload: FileUpload,
    @Arg("banner", () => GraphQLUpload, { nullable: true })
    bannerUpload: FileUpload,
    @Arg("size", () => Int, { nullable: false }) size: number
  ): Promise<UpdateProfileResponse> {
    console.log(size);
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
    // graphql upload

    if (avatarUpload?.filename) {
      let previousAvatarPath: string = "";
      if (user.profile?.avatar) {
        const avatar_path = user.profile.avatar.replace(
          `${___server__base__url__}/api/`,
          ""
        );
        previousAvatarPath = path.join(__dirname, `../../../${avatar_path}`);
      }

      if (previousAvatarPath !== "") {
        await unlinkSync(previousAvatarPath);
      }
      const { filename, createReadStream } = avatarUpload;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/profiles/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e);
        });
      user.profile.avatarSize = size;
      user.profile.avatar = `${___server__base__url__}/api/storage/profiles/${save_name}`;
    }

    if (await bannerUpload?.filename) {
      let previousBannerPath: string = "";
      if (user.profile?.banner) {
        const banner_path = user.profile.banner.replace(
          `${___server__base__url__}/api/`,
          ""
        );
        previousBannerPath = path.join(__dirname, `../../../${banner_path}`);
      }
      if (previousBannerPath !== "") {
        await unlinkSync(previousBannerPath);
      }
      const { filename, createReadStream } = bannerUpload;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/banners/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e);
        });
      user.profile.bannerSize = size;
      user.profile.banner = `${___server__base__url__}/api/storage/banners/${save_name}`;
    }

    if (email) {
      if (email.trim().toLowerCase() === user.email) {
        user.email = email.trim().toLowerCase();
        user.profile.email = email.trim().toLowerCase();
      } else {
        if (isValidEmail(email.toLowerCase().trim())) {
          const _user = await User.findOne({
            email: email.trim().toLowerCase(),
          });
          if (_user) {
            return {
              success: false,
              error: {
                field: "email",
                message:
                  "the email address in already in use by another account.",
              },
            };
          } else {
            user.email = email.trim().toLowerCase();
            user.profile.email = email.trim().toLowerCase();
          }
        } else {
          return {
            success: false,
            error: {
              field: "email",
              message: "invalid email address.",
            },
          };
        }
      }
    }
    if (username) {
      if (username.trim().toLowerCase() === user.username) {
        user.username = username.trim().toLowerCase();
        user.profile.username = username.trim().toLowerCase();
      } else {
        if (isValidUsername(username.toLowerCase().trim())) {
          const _user = await User.findOne({
            username: username.trim().toLowerCase(),
          });
          if (_user) {
            return {
              success: false,
              error: {
                field: "username",
                message: "the username is already in use by another account.",
              },
            };
          } else {
            user.username = username.trim().toLowerCase();
            user.profile.username = username.trim().toLowerCase();
          }
        } else {
          return {
            success: false,
            error: {
              field: "username",
              message: "invalid username.",
            },
          };
        }
      }
    }
    if (phoneNumber) {
      if (phoneNumber.trim().toLowerCase() === user.profile.phoneNumber) {
        user.profile.phoneNumber = phoneNumber.trim().toLowerCase();
      } else {
        if (isValidPhoneNumber(phoneNumber.toLowerCase().trim())) {
          const _profile = await Profile.findOne({
            phoneNumber: phoneNumber.toLowerCase().trim(),
          });
          if (_profile) {
            return {
              success: false,
              error: {
                field: "phoneNumber",
                message:
                  "the phone number in already in use by another account.",
              },
            };
          } else {
            user.profile.phoneNumber = phoneNumber.trim().toLowerCase();
          }
        } else {
          return {
            success: false,
            error: {
              field: "phone number",
              message: "invalid phone number.",
            },
          };
        }
      }
    }
    await user.profile.save();
    await user.save();
    return {
      success: true,
    };
  }
}
