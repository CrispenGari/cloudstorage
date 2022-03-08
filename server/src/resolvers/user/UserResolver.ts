import { User } from "../../entities/User/User";
import { Ctx, Query, Resolver } from "type-graphql";
import { UserContext } from "../../types";
import { getConnection } from "typeorm";

@Resolver()
export class UserResolver {
  // Getting the user by session id
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: UserContext): Promise<User | undefined> {
    if (typeof req.session.userId !== "undefined") {
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
      return user;
    }
    return undefined;
  }
}
