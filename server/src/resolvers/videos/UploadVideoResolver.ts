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
import { Video } from "../../entities/Video/Video";
import { ___server__base__url__ } from "../../constants";

@ObjectType()
class UploadVideoResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Error, { nullable: true })
  error?: Error;
}

@Resolver()
export class UploadVideoResolver {
  @Mutation(() => UploadVideoResponse)
  async uploadVideo(
    @Ctx() { req }: UserContext,
    @Arg("video", () => GraphQLUpload) video: FileUpload,
    @Arg("size", () => Int) size: number
  ): Promise<UploadVideoResponse> {
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

    if (!video.filename) {
      return {
        success: false,
        error: {
          message: "upload failed no video attached.",
          field: "video",
        },
      };
    } else {
      const { filename, createReadStream } = video;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/videos/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e.message);
        });
      const url: string = `${___server__base__url__}/api/storage/videos/${save_name}`;
      await Video.create({
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
