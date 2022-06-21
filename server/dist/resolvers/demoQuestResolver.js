"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoQuestResolver = void 0;
const type_graphql_1 = require("type-graphql");
const quest_demo_1 = require("../objectTypes/quest-demo");
const mongodb_1 = require("mongodb");
const updateDemoQuestArgs_1 = require("../inputTypes/updateDemoQuestArgs");
let DemoQuestResolver = class DemoQuestResolver {
    async createDemoQuest(ctx) {
        let demoQuest;
        try {
            const firstContentBlock = await ctx.db
                .collection("content-blocks")
                .insertOne({
                rich_text: [
                    {
                        text: "",
                        annotations: { bold: "default", textColor: "default" },
                    },
                ],
            });
            const _demoQuest = await ctx.db.collection("demo-quests").insertOne({
                content: [firstContentBlock.insertedId],
            });
            demoQuest = _demoQuest;
        }
        catch (error) {
            console.log(error);
        }
        console.log("id", demoQuest === null || demoQuest === void 0 ? void 0 : demoQuest.insertedId);
        return demoQuest === null || demoQuest === void 0 ? void 0 : demoQuest.insertedId;
    }
    async demoQuests(ctx) {
        const demoQuests = await ctx.db
            .collection("demo-quests")
            .find({})
            .toArray();
        return demoQuests;
    }
    async demoQuest(_id, ctx) {
        const demoQuest = await ctx.db
            .collection("demo-quests")
            .find({ _id: new mongodb_1.ObjectId(_id) })
            .toArray();
        return demoQuest[0];
    }
    async updateDemoQuest(updateDemoQuestArgs, ctx) {
        try {
            if (updateDemoQuestArgs.contentBlocksToUpdate.length !== 0) {
                console.log("updation...");
                for (let i = 0; i < updateDemoQuestArgs.contentBlocksToUpdate.length; i++) {
                    await ctx.db.collection("content-block").updateOne({
                        _id: new mongodb_1.ObjectId(updateDemoQuestArgs.contentBlocksToUpdate[i]._id),
                    }, {
                        $set: {
                            rich_text: updateDemoQuestArgs.contentBlocksToUpdate[i].rich_text,
                        },
                    });
                }
            }
            if (updateDemoQuestArgs.contentBlockIdsToDelete.length !== 0) {
                for (let i = 0; i < updateDemoQuestArgs.contentBlockIdsToDelete.length; i++) {
                    await ctx.db.collection("content-blocks").deleteOne({
                        _id: new mongodb_1.ObjectId(updateDemoQuestArgs.contentBlockIdsToDelete[i]),
                    });
                    await ctx.db.collection("demo-quests").updateOne({ _id: new mongodb_1.ObjectId(updateDemoQuestArgs.demoQuestId) }, {
                        $pull: {
                            content: new mongodb_1.ObjectId(updateDemoQuestArgs.contentBlockIdsToDelete[i]),
                        },
                    });
                }
            }
            if (updateDemoQuestArgs.contentBlocksToInsert.length !== 0) {
                for (let i = 0; i < updateDemoQuestArgs.contentBlocksToInsert.length; i++) {
                    await ctx.db.collection("content-blocks").insertOne({
                        _id: new mongodb_1.ObjectId(updateDemoQuestArgs.contentBlocksToInsert[i].contentBlock._id),
                        rich_text: updateDemoQuestArgs.contentBlocksToInsert[i].contentBlock
                            .rich_text,
                    });
                    await ctx.db.collection("demo-quests").updateOne({ _id: new mongodb_1.ObjectId(updateDemoQuestArgs.demoQuestId) }, {
                        $push: {
                            content: {
                                $each: [
                                    new mongodb_1.ObjectId(updateDemoQuestArgs.contentBlocksToInsert[i].contentBlock._id),
                                ],
                                $position: updateDemoQuestArgs.contentBlocksToInsert[i].position,
                            },
                        },
                    });
                }
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoQuestResolver.prototype, "createDemoQuest", null);
__decorate([
    (0, type_graphql_1.Query)(() => [quest_demo_1.DemoQuest]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoQuestResolver.prototype, "demoQuests", null);
__decorate([
    (0, type_graphql_1.Query)(() => quest_demo_1.DemoQuest),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemoQuestResolver.prototype, "demoQuest", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("updateDemoQuestArgs")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateDemoQuestArgs_1.updateDemoQuestArgs, Object]),
    __metadata("design:returntype", Promise)
], DemoQuestResolver.prototype, "updateDemoQuest", null);
DemoQuestResolver = __decorate([
    (0, type_graphql_1.Resolver)(quest_demo_1.DemoQuest)
], DemoQuestResolver);
exports.DemoQuestResolver = DemoQuestResolver;
//# sourceMappingURL=demoQuestResolver.js.map