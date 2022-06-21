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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const type_graphql_1 = require("type-graphql");
const quest_1 = require("./quest");
const user_1 = require("./user");
let Guild = class Guild {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Guild.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Guild.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", user_1.User)
], Guild.prototype, "guild_master", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", user_1.User)
], Guild.prototype, "guild_creator", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Guild.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Guild.prototype, "subcategory", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Guild.prototype, "level", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Guild.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Guild.prototype, "reputation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [user_1.User]),
    __metadata("design:type", Array)
], Guild.prototype, "solvers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [quest_1.Quest]),
    __metadata("design:type", Array)
], Guild.prototype, "quests_posted", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [quest_1.Quest]),
    __metadata("design:type", Array)
], Guild.prototype, "quests_attempted", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Guild.prototype, "creationDate", void 0);
Guild = __decorate([
    (0, type_graphql_1.ObjectType)()
], Guild);
exports.Guild = Guild;
//# sourceMappingURL=guild.js.map