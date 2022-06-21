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
exports.QuestResolver = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const quest_1 = require("../objectTypes/quest");
const createQuest_1 = require("../inputTypes/createQuest");
const redactQuest_1 = require("../inputTypes/redactQuest");
const quest_demo_1 = require("../objectTypes/quest-demo");
let QuestResolver = class QuestResolver {
    async createQuest(createQuestArgs, ctx) {
        let quest;
        try {
            const _quest = await ctx.db.collection("quests").insertOne({
                _id: new mongodb_1.ObjectId(createQuestArgs._id),
                contentIds: createQuestArgs.blockIds,
                creationdate: new Date(),
            });
            quest = _quest;
        }
        catch (error) {
            console.log(error);
        }
        return quest === null || quest === void 0 ? void 0 : quest.insertedId;
    }
    async quests(ctx) {
        const quests = await ctx.db.collection("quests").find({}).toArray();
        return quests;
    }
    async quest(_id, ctx) {
        const quest = await ctx.db
            .collection("quests")
            .find({ _id: new mongodb_1.ObjectId(_id) })
            .toArray();
        return quest[0];
    }
    async redactQuest(redactQuestArgs, ctx) {
        try {
            await ctx.db.collection("quests").updateOne({ _id: new mongodb_1.ObjectId(redactQuestArgs._id) }, {
                $set: {
                    contentIds: redactQuestArgs.blockIds,
                    updatedAt: new Date(),
                },
            });
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
    __param(0, (0, type_graphql_1.Arg)("createQuestArgs")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuest_1.createQuestArgs, Object]),
    __metadata("design:returntype", Promise)
], QuestResolver.prototype, "createQuest", null);
__decorate([
    (0, type_graphql_1.Query)(() => [quest_demo_1.DemoQuest]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestResolver.prototype, "quests", null);
__decorate([
    (0, type_graphql_1.Query)(() => quest_demo_1.DemoQuest),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestResolver.prototype, "quest", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("redactQuestArgs")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redactQuest_1.redactQuestArgs, Object]),
    __metadata("design:returntype", Promise)
], QuestResolver.prototype, "redactQuest", null);
QuestResolver = __decorate([
    (0, type_graphql_1.Resolver)(quest_1.Quest)
], QuestResolver);
exports.QuestResolver = QuestResolver;
//# sourceMappingURL=questResolver.js.map