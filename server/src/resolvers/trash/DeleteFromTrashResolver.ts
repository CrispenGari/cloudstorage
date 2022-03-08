import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Trash } from "../../entities/Trash/Trash";
import { unlinkSync } from "fs";
import path from "path";
import { ___server__base__url__ } from "../../constants";
import { UserContext } from "../../types";
import { User } from "../../entities/User/User";
@Resolver()
export class DeleteFromTrashResolver {
  @Mutation(() => Boolean)
  async deleteFromTrash(
    @Ctx() { req }: UserContext,
    @Arg("id", () => String) id: string
  ): Promise<Boolean> {
    const user = await getConnection()
      .getRepository(User)
      .findOne({
        where: { uid: req.session.userId },
        relations: [
          "profile",
          "musics",
          "documents",
          "pictures",
          "videos",
          "miscellaneous",
          "trash",
        ],
      });

    if (!user) return false;
    const file = await Trash.findOne(id);
    if (!file) return false;

    const { url, size } = file;
    const item_path = url.replace(`${___server__base__url__}/api/`, "");
    const abs_path = path.join(__dirname, `../../../${item_path}`);
    await unlinkSync(abs_path);
    user.usedStorage = user.usedStorage - size;
    await user.save();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Trash)
      .where({
        id: file.id,
      })
      .execute();
    return true;
  }
}
