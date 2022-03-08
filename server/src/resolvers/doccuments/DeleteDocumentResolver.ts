import { Arg, Mutation, Resolver } from "type-graphql";
import path from "path";
import { renameSync } from "fs";
import { getConnection } from "typeorm";
import { Document } from "../../entities/Document/Document";
import { Trash } from "../../entities/Trash/Trash";
import { ___server__base__url__ } from "../../constants";
@Resolver()
export class DeleteDocumentResolver {
  @Mutation(() => Boolean)
  async deleteDocument(
    @Arg("id", () => String) id: string,
    @Arg("type", () => String) type: string
  ): Promise<Boolean> {
    const document = await Document.findOne(id, {
      relations: ["user"],
    });
    if (!document) return false;

    // move to recyle bin

    const { user, filename, size, url } = document;

    const document_path = url.replace(`${___server__base__url__}/api/`, "");
    const old_abs_path = path.join(__dirname, `../../../${document_path}`);
    const new_abs_path = path.join(
      __dirname,
      `../../../${document_path}`.replace("storage/documents", "storage/trash")
    );
    await renameSync(old_abs_path, new_abs_path);
    await Trash.create({
      type: type,
      filename,
      user,
      size,
      url: url.replace("storage/documents", "storage/trash"),
    }).save();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Document)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}
