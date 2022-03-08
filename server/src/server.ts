import "reflect-metadata";
import "dotenv/config";
import { createServer, Server } from "http";
import express, { Application } from "express";
import cors from "cors";
import path from "path";
import {
  __cookieName__,
  __cookieSecret__,
  __maxAge__,
  __port__,
  __secure__,
  ___client__base__url__,
} from "./constants";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { Resolvers } from "./resolvers";
import { graphqlUploadExpress } from "graphql-upload";
(async () => {
  // Connecting to the database
  await createConnection();
  //  Vars
  const app: Application = express();
  const httpServer: Server = createServer(app);
  const RedisStore = connectRedis(session);
  const redis: Redis.Redis = new Redis();
  const schema = await buildSchema({
    resolvers: [...Resolvers],
    validate: false,
  });
  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );

  // Middleware
  app.use(
    express.json({
      limit: "10mb",
    })
  );
  app.use(
    cors({
      credentials: true,
      origin: ___client__base__url__,
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: __cookieName__,
      secret: __cookieSecret__,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: __secure__,
        maxAge: __maxAge__,
        sameSite: "lax",
      },
    })
  );
  app.use("/api/storage", express.static(path.join(__dirname, "../storage")));

  // 25mb
  app.use(graphqlUploadExpress({ maxFileSize: 2.5e7, maxFiles: 10000 }));
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({}),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    cors: false,
    app,
    path: "/graphql",
  });
  httpServer.listen(__port__);
})()
  .then(() => {
    console.log(`The server is running on port: ${__port__}`);
  })
  .catch((error) => console.log(error));
