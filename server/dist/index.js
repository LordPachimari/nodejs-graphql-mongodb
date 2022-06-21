"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("./resolvers/userResolver");
const demoQuestResolver_1 = require("./resolvers/demoQuestResolver");
const apollo_server_core_1 = require("apollo-server-core");
const questResolver_1 = require("./resolvers/questResolver");
const uri = "mongodb+srv://Mugiwara:Rwthunder123@cluster0.cbfp0pw.mongodb.net/?retryWrites=true&w=majority";
const dbName = "studlancer";
const client = new mongodb_1.MongoClient(uri);
let majors;
const run = async () => {
    await client.connect();
    console.log("connected to MongoDb database!");
    const db = client.db(dbName);
    const app = (0, express_1.default)();
    const port = 4000;
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    const httpServer = http_1.default.createServer(app);
    const apolloSever = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [userResolver_1.UserResolver, demoQuestResolver_1.DemoQuestResolver, questResolver_1.QuestResolver],
        }),
        context: ({ req, res }) => ({
            req,
            res,
            db: db,
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
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
//# sourceMappingURL=index.js.map