import { Arg, Mutation, Resolver } from "type-graphql";
import path from "path";
import { renameSync } from "fs";
import { getConnection } from "typeorm";
import { Music } from "../../entities/Music/Music";
import { Trash } from "../../entities/Trash/Trash";
import { ___server__base__url__ } from "../../constants";

@Resolver()
export class DeleteMusicResolver {
  @Mutation(() => Boolean)
  async deleteMusic(
    @Arg("id", () => String) id: string,
    @Arg("type", () => String) type: string
  ): Promise<Boolean> {
    const music = await Music.findOne(id);
    if (!music) return false;
    const { user, filename, size, url } = music;
    const music_path = url.replace(`${___server__base__url__}/api/`, "");
    const old_abs_path = path.join(__dirname, `../../../${music_path}`);
    const new_abs_path = path.join(
      __dirname,
      `../../../${music_path}`.replace("storage/musics", "storage/trash")
    );
    await renameSync(old_abs_path, new_abs_path);
    await Trash.create({
      type: type,
      filename,
      user,
      size,
      url: url.replace("storage/musics", "storage/trash"),
    }).save();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Music)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}
