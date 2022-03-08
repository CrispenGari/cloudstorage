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
import { Music } from "../../entities/Music/Music";
import { ___server__base__url__ } from "../../constants";

@ObjectType()
class UploadMusicResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Error, { nullable: true })
  error?: Error;
}

@Resolver()
export class UploadMusicResolver {
  @Mutation(() => UploadMusicResponse)
  async uploadMusic(
    @Ctx() { req }: UserContext,
    @Arg("music", () => GraphQLUpload) music: FileUpload,
    @Arg("size", () => Int) size: number
  ): Promise<UploadMusicResponse> {
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

    if (!music.filename) {
      return {
        success: false,
        error: {
          message: "upload failed no music attached.",
          field: "music",
        },
      };
    } else {
      const { filename, createReadStream } = music;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/musics/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e.message);
        });
      const url: string = `${___server__base__url__}/api/storage/musics/${save_name}`;

      await Music.create({
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
