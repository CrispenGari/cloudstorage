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
import { Document as Doc } from "../../entities/Document/Document";
import { ___server__base__url__ } from "../../constants";

@ObjectType()
class UploadDocumentResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Error, { nullable: true })
  error?: Error;
}

@Resolver()
export class UploadDocumentResolver {
  @Mutation(() => UploadDocumentResponse)
  async uploadDocument(
    @Ctx() { req }: UserContext,
    @Arg("document", () => GraphQLUpload) document: FileUpload,
    @Arg("size", () => Int) size: number
  ): Promise<UploadDocumentResponse> {
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

    if (!document.filename) {
      return {
        success: false,
        error: {
          message: "upload failed no document attached.",
          field: "document",
        },
      };
    } else {
      const { filename, createReadStream } = document;
      const save_name: string = uuid_v4() + path.extname(filename);
      await createReadStream()
        .pipe(
          createWriteStream(
            path.join(__dirname, `../../../storage/documents/${save_name}`)
          )
        )
        .on("error", (e) => {
          console.log(false, e.message);
        });
      const url: string = `${___server__base__url__}/api/storage/documents/${save_name}`;
      await Doc.create({
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
