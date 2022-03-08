import express from "express";
import { Redis } from "ioredis";
import Pusher from "pusher";
export interface UserContext {
  req: express.Request & {
    session: any;
  };
  res: express.Response;
  redis: Redis;
  pusher: Pusher;
}
