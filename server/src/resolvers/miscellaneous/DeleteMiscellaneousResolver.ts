import { Arg, Mutation, Resolver } from "type-graphql";
import path from "path";
import { renameSync } from "fs";
import { getConnection } from "typeorm";
import { Miscellaneous } from "../../entities/Miscellaneous/Miscellaneous";
import { Trash } from "../../entities/Trash/Trash";
import { ___server__base__url__ } from "../../constants";
@Resolver()
export class DeleteMiscellaneousResolver {
  @Mutation(() => Boolean)
  async deleteMiscellaneous(
    @Arg("id", () => String) id: string,
    @Arg("type", () => String) type: string
  ): Promise<Boolean> {
    const miscellaneous = await Miscellaneous.findOne(id, {
      relations: ["user"],
    });

    if (!miscellaneous) return false;
    // move to recyle bin
    const { user, filename, size, url } = miscellaneous;
    const miscellaneous_path = url.replace(
      `${___server__base__url__}/api/`,
      ""
    );
    const old_abs_path = path.join(__dirname, `../../../${miscellaneous_path}`);
    const new_abs_path = path.join(
      __dirname,
      `../../../${miscellaneous_path}`.replace(
        "storage/miscellaneous",
        "storage/trash"
      )
    );
    await renameSync(old_abs_path, new_abs_path);
    await Trash.create({
      type,
      filename,
      user,
      size,
      url: url.replace("storage/miscellaneous", "storage/trash"),
    }).save();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Miscellaneous)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}
