import { UserContext } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User/User";
import { Trash } from "../../entities/Trash/Trash";
import { renameSync } from "fs";
import path from "path";
import { ___server__base__url__ } from "../../constants";
import { Document } from "../../entities/Document/Document";
import { Music } from "../../entities/Music/Music";
import { Picture } from "../../entities/Pictures/Picture";
import { Video } from "../../entities/Video/Video";
import { Miscellaneous } from "../../entities/Miscellaneous/Miscellaneous";
@Resolver()
export class UnDeleteFromTrashResolver {
  @Mutation(() => Boolean)
  async unDeleteFile(
    @Ctx() { req }: UserContext,
    @Arg("id", () => String) id: string
  ): Promise<Boolean> {
    const user = await getConnection()
      .getRepository(User)
      .findOne({
        where: { uid: req.session.userId },
        relations: ["trash"],
      });
    if (!user) return false;

    const file = await Trash.findOne(id);
    if (!file) return false;

    const { type, url, filename, size } = file;
    if (type === "Document") {
      const document_path = url.replace(`${___server__base__url__}/api/`, "");
      const old_abs_path = path.join(__dirname, `../../../${document_path}`);
      const new_abs_path = path.join(
        __dirname,
        `../../../${document_path}`.replace(
          "storage/trash",
          "storage/documents"
        )
      );
      await renameSync(old_abs_path, new_abs_path);
      await Document.create({
        filename,
        user,
        size,
        url: url.replace("storage/trash", "storage/documents"),
      }).save();
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Trash)
        .where("id = :id", { id })
        .execute();
    }
    if (type === "Music") {
      const music_path = url.replace(`${___server__base__url__}/api/`, "");
      const old_abs_path = path.join(__dirname, `../../../${music_path}`);
      const new_abs_path = path.join(
        __dirname,
        `../../../${music_path}`.replace("storage/trash", "storage/musics")
      );
      await renameSync(old_abs_path, new_abs_path);
      await Music.create({
        filename,
        user,
        size,
        url: url.replace("storage/trash", "storage/musics"),
      }).save();
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Trash)
        .where("id = :id", { id })
        .execute();
    }
    if (type === "Picture") {
      const picture_path = url.replace(`${___server__base__url__}/api/`, "");
      const old_abs_path = path.join(__dirname, `../../../${picture_path}`);
      const new_abs_path = path.join(
        __dirname,
        `../../../${picture_path}`.replace("storage/trash", "storage/pictures")
      );
      await renameSync(old_abs_path, new_abs_path);
      await Picture.create({
        filename,
        user,
        size,
        url: url.replace("storage/trash", "storage/pictures"),
      }).save();
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Trash)
        .where("id = :id", { id })
        .execute();
    }
    if (type === "Video") {
      const video_path = url.replace(`${___server__base__url__}/api/`, "");
      const old_abs_path = path.join(__dirname, `../../../${video_path}`);
      const new_abs_path = path.join(
        __dirname,
        `../../../${video_path}`.replace("storage/trash", "storage/videos")
      );
      await renameSync(old_abs_path, new_abs_path);
      await Video.create({
        filename,
        user,
        size,
        url: url.replace("storage/trash", "storage/videos"),
      }).save();
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Trash)
        .where("id = :id", { id })
        .execute();
    }
    if (type === "Miscellaneous") {
      const miscellaneous_path = url.replace(
        `${___server__base__url__}/api/`,
        ""
      );
      const old_abs_path = path.join(
        __dirname,
        `../../../${miscellaneous_path}`
      );
      const new_abs_path = path.join(
        __dirname,
        `../../../${miscellaneous_path}`.replace(
          "storage/trash",
          "storage/miscellaneous"
        )
      );
      await renameSync(old_abs_path, new_abs_path);
      await Miscellaneous.create({
        filename,
        user,
        size,
        url: url.replace("storage/trash", "storage/miscellaneous"),
      }).save();
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Trash)
        .where("id = :id", { id })
        .execute();
    }
    return true;
  }
}
