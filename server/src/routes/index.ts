/*
/developer/api?profile=true&trash=true&music=true&documents=true&miscellaneous=true&videos=true
*/

import { Router, Request, Response } from "express";
import { User } from "../entities/User/User";
import { getConnection } from "typeorm";
const router = Router({
  caseSensitive: true,
});
router.get("/developers/api", async (req: Request, res: Response) => {
  console.log(req.query);
  if (!req.query?.apiKey || !req.query?.apiSecretKey) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized requests.",
      help: "No API KEY and API SECRET key provided in the request.",
      url: req.url,
    });
  }
  const { apiKey, apiSecretKey } = req.query;
  const availableRelations: string[] = [
    "profile",
    "musics",
    "documents",
    "pictures",
    "videos",
    "miscellaneous",
    "trash",
  ];
  const relations: any[] = Object.entries(req.query)
    .map((ele) => [ele[0], Boolean(ele[1])])
    .filter((e) => e[1])
    .map((e) => e[0])
    .filter((e) => availableRelations.indexOf(e as any) !== -1);
  const user = await getConnection()
    .getRepository(User)
    .findOne({
      where: {
        apiKey,
      },
      relations: [...relations],
    });

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized requests.",
      help: "Invalid API credentials, make sure your API KEY and API SECRETE is valid.",
    });
  }

  if (user.apiSecretKey !== apiSecretKey) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized requests.",
      help: "Invalid API credentials, make sure your API KEY and API SECRETE is valid.",
    });
  }
  return res.status(200).json(user);
});

export default router;
