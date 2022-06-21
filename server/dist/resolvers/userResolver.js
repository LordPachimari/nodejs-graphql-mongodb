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
exports.UserResolver = void 0;
const createUserInput_1 = require("../inputTypes/createUserInput");
const user_1 = require("../objectTypes/user");
const type_graphql_1 = require("type-graphql");
let UserResolver = class UserResolver {
    async createUser(createUserInput, ctx) {
        let user;
        try {
            const _user = await ctx.db.collection("users").insertOne({
                username: createUserInput.username,
                user_secret: createUserInput.user_secret,
                balance: 0,
            });
            user = _user;
        }
        catch (error) {
            console.log(error);
        }
        console.log("user in the server", user);
        return user;
    }
    async users(ctx) {
        const users = await ctx.db.collection("users").find().toArray();
        console.log("users from the server", users);
        return users;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("createUserInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserInput_1.createUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=userResolver.js.map