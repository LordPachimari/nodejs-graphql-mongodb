import { createUserInput } from "../inputTypes/createUserInput";
import { User } from "../objectTypes/user";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/context";
import { DemoQuest } from "../objectTypes/quest-demo";
import { ObjectId } from "mongodb";

import { updateDemoQuestArgs } from "../inputTypes/updateDemoQuestArgs";

@Resolver(DemoQuest)
export class DemoQuestResolver {
  @Mutation(() => String)
  async createDemoQuest(@Ctx() ctx: Context) {
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
          // creationDate: new Date(),
        });
      const _demoQuest = await ctx.db.collection("demo-quests").insertOne({
        content: [firstContentBlock.insertedId],
        // creationDate: new Date(),
      });

      demoQuest = _demoQuest;
    } catch (error) {
      console.log(error);
    }
    console.log("id", demoQuest?.insertedId);

    return demoQuest?.insertedId;
  }
  @Query(() => [DemoQuest])
  async demoQuests(@Ctx() ctx: Context) {
    const demoQuests = await ctx.db
      .collection("demo-quests")
      .find({})
      .toArray();

    return demoQuests;
  }
  @Query(() => DemoQuest)
  async demoQuest(@Arg("_id") _id: string, @Ctx() ctx: Context) {
    const demoQuest = await ctx.db
      .collection("demo-quests")
      .find({ _id: new ObjectId(_id) })
      .toArray();

    return demoQuest[0];
  }
  @Mutation(() => Boolean)
  async updateDemoQuest(
    @Arg("updateDemoQuestArgs") updateDemoQuestArgs: updateDemoQuestArgs,

    @Ctx() ctx: Context
  ) {
    try {
      if (updateDemoQuestArgs.contentBlocksToUpdate.length !== 0) {
        console.log("updation...");
        for (
          let i = 0;
          i < updateDemoQuestArgs.contentBlocksToUpdate.length;
          i++
        ) {
          await ctx.db.collection("content-block").updateOne(
            {
              _id: new ObjectId(
                updateDemoQuestArgs.contentBlocksToUpdate[i]._id
              ),
            },
            {
              $set: {
                rich_text:
                  updateDemoQuestArgs.contentBlocksToUpdate[i].rich_text,
              },
            }
          );
        }
      }
      if (updateDemoQuestArgs.contentBlockIdsToDelete.length !== 0) {
        for (
          let i = 0;
          i < updateDemoQuestArgs.contentBlockIdsToDelete.length;
          i++
        ) {
          await ctx.db.collection("content-blocks").deleteOne({
            _id: new ObjectId(updateDemoQuestArgs.contentBlockIdsToDelete[i]),
          });
          await ctx.db.collection("demo-quests").updateOne(
            { _id: new ObjectId(updateDemoQuestArgs.demoQuestId) },
            {
              $pull: {
                content: new ObjectId(
                  updateDemoQuestArgs.contentBlockIdsToDelete[i]
                ),
              },
            }
          );
        }
      }
      if (updateDemoQuestArgs.contentBlocksToInsert.length !== 0) {
        for (
          let i = 0;
          i < updateDemoQuestArgs.contentBlocksToInsert.length;
          i++
        ) {
          await ctx.db.collection("content-blocks").insertOne({
            _id: new ObjectId(
              updateDemoQuestArgs.contentBlocksToInsert[i].contentBlock._id
            ),
            rich_text:
              updateDemoQuestArgs.contentBlocksToInsert[i].contentBlock
                .rich_text,
          });

          await ctx.db.collection("demo-quests").updateOne(
            { _id: new ObjectId(updateDemoQuestArgs.demoQuestId) },
            {
              $push: {
                content: {
                  $each: [
                    new ObjectId(
                      updateDemoQuestArgs.contentBlocksToInsert[
                        i
                      ].contentBlock._id
                    ),
                  ],
                  $position:
                    updateDemoQuestArgs.contentBlocksToInsert[i].position,
                },
              },
            }
          );
        }
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
