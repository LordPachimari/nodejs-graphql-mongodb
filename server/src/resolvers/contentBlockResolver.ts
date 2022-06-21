import { createUserInput } from "../inputTypes/createUserInput";
import { User } from "../objectTypes/user";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/context";
import { demoQuestInput } from "../inputTypes/demoQuestInput";
import { DemoQuest } from "../objectTypes/quest-demo";
import { ObjectId } from "mongodb";
import { Quest } from "../objectTypes/quest";
import { createQuestArgs } from "../inputTypes/createQuest";
import { redactQuestArgs } from "../inputTypes/redactQuest";
import { ContentBlock } from "../objectTypes/content-block";
import { createContentBlockArgs } from "../inputTypes/createContentBlock";

@Resolver(ContentBlock)
export class ContentBlockResolver {
  @Mutation(() => String)
  async createBlock(
    @Arg("createContentBlock") createContentBlockArgs: createContentBlockArgs,
    @Ctx() ctx: Context
  ) {
    let content_block;
    try {
      const _content_block = await ctx.db
        .collection("content-blocks")
        .insertOne({
          _id: new ObjectId(createContentBlockArgs._id),
          type: createContentBlockArgs.type,
          color: createContentBlockArgs.color,
          parent_quest: createContentBlockArgs.parent_quest,
          creationdate: new Date(),
        });
      await ctx.db.collection("quests").updateOne(
        { _id: new ObjectId(createContentBlockArgs._id) },
        {
          $set: {
            contentIds: createContentBlockArgs.parent_quest,
            updatedAt: new Date(),
          },
        }
      );

      content_block = _content_block;
    } catch (error) {
      console.log(error);
    }

    return content_block?.insertedId;
  }
  @Query(() => [DemoQuest])
  async quests(@Ctx() ctx: Context) {
    const quests = await ctx.db.collection("quests").find({}).toArray();

    return quests;
  }
  @Query(() => DemoQuest)
  async quest(@Arg("_id") _id: string, @Ctx() ctx: Context) {
    const quest = await ctx.db
      .collection("quests")
      .find({ _id: new ObjectId(_id) })
      .toArray();

    return quest[0];
  }
  @Mutation(() => Boolean)
  async redactQuest(
    @Arg("redactQuestArgs") redactQuestArgs: redactQuestArgs,
    @Ctx() ctx: Context
  ) {
    try {
      await ctx.db.collection("quests").updateOne(
        { _id: new ObjectId(redactQuestArgs._id) },
        {
          $set: {
            contentIds: redactQuestArgs.blockIds,
            updatedAt: new Date(),
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
