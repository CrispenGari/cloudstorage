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
import { Miscellaneous } from "../../entities/Miscellaneous/Miscellaneous";
import { ___server__base__url__ } from "../../constants";

@ObjectType()
class UploadMiscellaneousResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Error, { nullable: true })
  error?: Error;
}

@Resolver()
export class UploadMiscellaneousResolver {
  @Mutation(() => UploadMiscellaneousResponse)
  async uploadMiscellaneous(
    @Ctx() { req }: UserContext,
    @Arg("miscellaneous", () => GraphQLUpload) miscellaneous: FileUpload,
    @Arg("size", () => Int) size: number
  ): Promise<UploadMiscellaneousResponse> {
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

    if (!miscellaneous.filename) {
      return {
        success: false,
        error: {
          message: "upload failed no file attached.",
          field: "miscellaneous",
        },
      };
    } else {
      const { filename, createReadStream } = miscellaneous;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/miscellaneous/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e.message);
        });
      const url: string = `${___server__base__url__}/api/storage/miscellaneous/${save_name}`;
      await Miscellaneous.create({
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
