import { Arg, Mutation, Resolver } from "type-graphql";
import path from "path";
import { renameSync } from "fs";
import { getConnection } from "typeorm";
import { Video } from "../../entities/Video/Video";
import { Trash } from "../../entities/Trash/Trash";
import { ___server__base__url__ } from "../../constants";
@Resolver()
export class DeleteVideoResolver {
  @Mutation(() => Boolean)
  async deleteVideo(
    @Arg("id", () => String) id: string,
    @Arg("type", () => String) type: string
  ): Promise<Boolean> {
    const video = await Video.findOne(id, {
      relations: ["user"],
    });
    if (!video) return false;
    const { user, filename, size, url } = video;
    const video_path = url.replace(`${___server__base__url__}/api/`, "");
    const old_abs_path = path.join(__dirname, `../../../${video_path}`);
    const new_abs_path = path.join(
      __dirname,
      `../../../${video_path}`.replace("storage/videos", "storage/trash")
    );
    await renameSync(old_abs_path, new_abs_path);
    await Trash.create({
      type: type,
      filename,
      user,
      size,
      url: url.replace("storage/videos", "storage/trash"),
    }).save();

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Video)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}
