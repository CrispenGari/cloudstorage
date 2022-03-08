import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Error } from "../user/ObjectTypes/UpdateUserObjectType";
import { createWriteStream } from "fs";
import { v4 as uuid_v4 } from "uuid";
import { User } from "../../entities/User/User";
import { UserContext } from "../../types";
import path from "path";
import { Picture } from "../../entities/Pictures/Picture";
import { ___server__base__url__ } from "../../constants";

@ObjectType()
class UploadPictureResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Error, { nullable: true })
  error?: Error;
}

@Resolver()
export class UploadPictureResolver {
  @Mutation(() => UploadPictureResponse)
  async uploadPicture(
    @Ctx() { req }: UserContext,
    @Arg("picture", () => GraphQLUpload) picture: FileUpload,
    @Arg("size", () => Int) size: number
  ): Promise<UploadPictureResponse> {
    const user = await User.findOne(
      { uid: req.session?.userId },
      { relations: ["profile"] }
    );

    if (!user) {
      return {
        success: false,
        error: {
          message: "upload failed user not authenticated.",
          field: "user",
        },
      };
    }

    if (!picture.filename) {
      return {
        success: false,
        error: {
          message: "upload failed no picture attached.",
          field: "picture",
        },
      };
    } else {
      const { filename, createReadStream } = picture;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/pictures/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e.message);
        });
      const url: string = `${___server__base__url__}/api/storage/pictures/${save_name}`;
      await Picture.create({
        filename,
        url,
        size,
        user,
      }).save();
    }

    return {
      success: true,
    };
  }
}
