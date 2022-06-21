import { createUserInput } from "../inputTypes/createUserInput";
import { User } from "../objectTypes/user";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/context";
import { ObjectId } from "mongodb";
import { Quest } from "../objectTypes/quest";
import { createQuestArgs } from "../inputTypes/createQuest";
import { redactQuestArgs } from "../inputTypes/redactQuest";
import { DemoQuest } from "../objectTypes/quest-demo";

@Resolver(Quest)
export class QuestResolver {
  @Mutation(() => String)
  async createQuest(
    @Arg("createQuestArgs") createQuestArgs: createQuestArgs,
    @Ctx() ctx: Context
  ) {
    let quest;
    try {
      const _quest = await ctx.db.collection("quests").insertOne({
        _id: new ObjectId(createQuestArgs._id),
        contentIds: createQuestArgs.blockIds,
        creationdate: new Date(),
      });

      quest = _quest;
    } catch (error) {
      console.log(error);
    }

    return quest?.insertedId;
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
