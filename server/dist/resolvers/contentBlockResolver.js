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
exports.ContentBlockResolver = void 0;
const type_graphql_1 = require("type-graphql");
const quest_demo_1 = require("../objectTypes/quest-demo");
const mongodb_1 = require("mongodb");
const redactQuest_1 = require("../inputTypes/redactQuest");
const content_block_1 = require("../objectTypes/content-block");
const createContentBlock_1 = require("../inputTypes/createContentBlock");
let ContentBlockResolver = class ContentBlockResolver {
    async createBlock(createContentBlockArgs, ctx) {
        let content_block;
        try {
            const _content_block = await ctx.db
                .collection("content-blocks")
                .insertOne({
                _id: new mongodb_1.ObjectId(createContentBlockArgs._id),
                type: createContentBlockArgs.type,
                color: createContentBlockArgs.color,
                parent_quest: createContentBlockArgs.parent_quest,
                creationdate: new Date(),
            });
            await ctx.db.collection("quests").updateOne({ _id: new mongodb_1.ObjectId(createContentBlockArgs._id) }, {
                $set: {
                    contentIds: createContentBlockArgs.parent_quest,
                    updatedAt: new Date(),
                },
            });
            content_block = _content_block;
        }
        catch (error) {
            console.log(error);
        }
        return content_block === null || content_block === void 0 ? void 0 : content_block.insertedId;
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
    __param(0, (0, type_graphql_1.Arg)("createContentBlock")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createContentBlock_1.createContentBlockArgs, Object]),
    __metadata("design:returntype", Promise)
], ContentBlockResolver.prototype, "createBlock", null);
__decorate([
    (0, type_graphql_1.Query)(() => [quest_demo_1.DemoQuest]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentBlockResolver.prototype, "quests", null);
__decorate([
    (0, type_graphql_1.Query)(() => quest_demo_1.DemoQuest),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContentBlockResolver.prototype, "quest", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("redactQuestArgs")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redactQuest_1.redactQuestArgs, Object]),
    __metadata("design:returntype", Promise)
], ContentBlockResolver.prototype, "redactQuest", null);
ContentBlockResolver = __decorate([
    (0, type_graphql_1.Resolver)(content_block_1.ContentBlock)
], ContentBlockResolver);
exports.ContentBlockResolver = ContentBlockResolver;
//# sourceMappingURL=contentBlockResolver.js.map