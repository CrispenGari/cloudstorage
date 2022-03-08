import { Picture } from "../../entities/Pictures/Picture";
import { Arg, Mutation, Resolver } from "type-graphql";
import path from "path";
import { renameSync } from "fs";
import { getConnection } from "typeorm";
import { Trash } from "../../entities/Trash/Trash";
import { ___server__base__url__ } from "../../constants";
@Resolver()
export class DeletePictureResolver {
  @Mutation(() => Boolean)
  async deletePicture(
    @Arg("id", () => String) id: string,
    @Arg("type", () => String) type: string
  ): Promise<Boolean> {
    const picture = await Picture.findOne(id, { relations: ["user"] });
    if (!picture) return false;
    // move to recyle bin
    const { user, filename, size, url } = picture;
    const picture_path = url.replace(`${___server__base__url__}/api/`, "");
    const old_abs_path = path.join(__dirname, `../../../${picture_path}`);
    const new_abs_path = path.join(
      __dirname,
      `../../../${picture_path}`.replace("storage/pictures", "storage/trash")
    );
    await renameSync(old_abs_path, new_abs_path);
    await Trash.create({
      type: type,
      filename,
      user,
      size,
      url: url.replace("storage/pictures", "storage/trash"),
    }).save();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Picture)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}
