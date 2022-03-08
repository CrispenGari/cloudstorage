import { UserContext } from "../../types";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User/User";
import { Trash } from "../../entities/Trash/Trash";
import { unlinkSync } from "fs";
import path from "path";
import { ___server__base__url__ } from "../../constants";
@Resolver()
export class EmptyTrashResolver {
  @Mutation(() => Boolean)
  async emptyTrash(@Ctx() { req }: UserContext): Promise<Boolean> {
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
    if (!user) return false;
    user.trash?.forEach(async (item) => {
      const { url, size } = item;
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
          id: item.id,
        })
        .execute();
    });

    return true;
  }
}
