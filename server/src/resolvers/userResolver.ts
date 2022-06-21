import { createUserInput } from "../inputTypes/createUserInput";
import { User } from "../objectTypes/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/context";

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("createUserInput") createUserInput: createUserInput,
    @Ctx() ctx: Context
  ) {
    let user;
    try {
      const _user = await ctx.db.collection("users").insertOne({
        username: createUserInput.username,
        user_secret: createUserInput.user_secret,
        balance: 0,
      });

      user = _user;
    } catch (error) {
      console.log(error);
    }
    console.log("user in the server", user);
    return user;
    // console.log("values from server", createUserInput);
    // console.log(
    //   "values from server2",
    //   createUserInput.username,
    //   createUserInput.user_secret
    // );
  }
  @Query(() => [User])
  async users(@Ctx() ctx: Context) {
    const users = await ctx.db.collection("users").find().toArray();

    console.log("users from the server", users);

    return users;
  }
}
