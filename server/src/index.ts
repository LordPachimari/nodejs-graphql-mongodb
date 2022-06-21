import "reflect-metadata";
import express from "express";
import http from "http";
import { MongoClient } from "mongodb";
import cors from "cors";
import fs from "fs";
import axios from "axios";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { DemoQuestResolver } from "./resolvers/demoQuestResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { QuestResolver } from "./resolvers/questResolver";
import { ContentBlockResolver } from "./resolvers/contentBlockResolver";

interface Majors {
  rows: [];
}
const uri =
  "mongodb+srv://Mugiwara:Rwthunder123@cluster0.cbfp0pw.mongodb.net/?retryWrites=true&w=majority";

const dbName = "studlancer";
const client = new MongoClient(uri);
let majors: Majors;

const run = async () => {
  await client.connect();
  console.log("connected to MongoDb database!");
  const db = client.db(dbName); //
  // db.createCollection("demo-quests", {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: "object",
  //       required: ["content"],
  //       properties: {
  //         creationDate: {
  //           bsonType: "date",
  //           description: "must be date type and is optional",
  //         },
  //         content: {
  //           bsonType: "array",
  //           description: "array of unique content block ids",
  //           items: {
  //             bsonType: "objectId",
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  // db.createCollection("content-blocks", {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: "object",
  //       required: ["rich_text"],
  //       properties: {
  //         creationDate: {
  //           bsonType: "date",
  //           description: "must be date type and is optional",
  //         },

  //         rich_text: {
  //           bsonType: "array",
  //           items: {
  //             bsonType: "object",
  //             required: ["text", "annotations"],
  //             properties: {
  //               text: {
  //                 bsonType: "string",
  //                 description: "must be a string",
  //               },
  //               annotations: {
  //                 bsonType: "object",
  //                 required: ["textColor", "bold"],
  //                 properties: {
  //                   textColor: {
  //                     bsonType: "string",
  //                     description: "write your damn text color",
  //                   },
  //                   bold: {
  //                     bsonType: "string",
  //                     description: "is your text bold or default",
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // db.createCollection("quests", {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: "object",
  //       required: ["_id", "creationDate"],
  //       properties: {
  //         _id: {
  //           bsonType: "objectId",
  //           description: "unique id is required for each quest",
  //         },
  //         contentIds: {
  //           bsonType: "array",
  //           description: "array of unique block ids",
  //         },
  //         creationDate: {
  //           bsonType: "date",
  //           description: "must be date type and is required",
  //         },
  //         updatedAt: {
  //           bsonType: "date",
  //           description: "must be date type and is required",
  //         },
  //       },
  //     },
  //   },
  // });

  // db.createCollection("users", {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: "object",
  //       required: [
  //         "first_name",
  //         "last_name",
  //         "email",
  //         "phone_number",
  //         "account_type",
  //       ],
  //       properties: {
  //         first_name: {
  //           bsonType: "string",
  //           description: "must be a string and is required",
  //         },
  //         last_name: {
  //           bsonType: "string",
  //           description: "must be a string and is required",
  //         },
  //         email: {
  //           bsonType: "string",
  //           description: "must be a string and is required",
  //         },
  //         phone_number: {
  //           bsonType: "int",

  //           description: "must be an integer and is required",
  //         },
  //         major: {
  //           enum: ["Math", "English", "Computer Science", "History", null],
  //           description: "can only be one of the enum values and is required",
  //         },
  //         account_type: {
  //           enum: ["Employer", "Solver"],
  //           description: "can only be one of the enum values and is required",
  //         },
  //         username: {
  //           bsonType: "string",
  //           description: "must be a string and is optional",
  //         },
  //         balance: {
  //           bsonType: "int",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         biography: {
  //           bsonType: "string",
  //           description: "must be a string and write what u want there",
  //         },
  //         avarat_link: {
  //           bsonType: "string",
  //           description: "must be a string",
  //         },
  //         level: {
  //           bsonType: "int",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         experience: {
  //           bsonType: "int",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         categories: {
  //           enum: ["Math", "English", "Computer Science", "History", null],
  //           description: "can only be one of the enum values and is required",
  //         },
  //         subcategories: {
  //           enum: ["Math", "English", "Computer Science", "History", null],
  //           description: "can only be one of the enum values and is required",
  //         },
  //         quests_solved: {
  //           bsonType: "array",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         quests_attempted: {
  //           bsonType: "array",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         quests_posted: {
  //           bsonType: "array",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         quests_currently_solving: {
  //           bsonType: "array",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         achievements: {
  //           enum: ["Newby", "Intermediate", "Master", "Legend", null],
  //           description: "can only be one of the enum values and is required",
  //         },

  //         guild: {
  //           bsonType: "objectId",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //         notifications: {
  //           bsonType: "array",

  //           description: "must be an integer and is set to 0 at the beginning",
  //         },
  //       },
  //     },
  //   },
  // });

  const app = express();
  const port = 4000;
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  const httpServer = http.createServer(app);
  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, DemoQuestResolver, QuestResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
      db: db,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloSever.start();
  apolloSever.applyMiddleware({ app, cors: false });

  httpServer.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
  });
};
run().catch((err) => {
  console.log(err);
});
