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
exports.updateDemoQuestArgs = void 0;
const insertArgs_1 = require("./insertArgs");
const contentBlockInput_1 = require("./contentBlockInput");
const type_graphql_1 = require("type-graphql");
let updateDemoQuestArgs = class updateDemoQuestArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], updateDemoQuestArgs.prototype, "demoQuestId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], updateDemoQuestArgs.prototype, "contentBlockIdsToDelete", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [contentBlockInput_1.ContentBlockInput]),
    __metadata("design:type", Array)
], updateDemoQuestArgs.prototype, "contentBlocksToUpdate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [insertArgs_1.ContentBlocksToInsert]),
    __metadata("design:type", Array)
], updateDemoQuestArgs.prototype, "contentBlocksToInsert", void 0);
updateDemoQuestArgs = __decorate([
    (0, type_graphql_1.InputType)()
], updateDemoQuestArgs);
exports.updateDemoQuestArgs = updateDemoQuestArgs;
//# sourceMappingURL=updateDemoQuestArgs.js.map