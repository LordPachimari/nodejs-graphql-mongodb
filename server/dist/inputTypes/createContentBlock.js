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
exports.createContentBlockArgs = void 0;
const type_graphql_1 = require("type-graphql");
let createContentBlockArgs = class createContentBlockArgs {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], createContentBlockArgs.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], createContentBlockArgs.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], createContentBlockArgs.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], createContentBlockArgs.prototype, "parent_quest", void 0);
createContentBlockArgs = __decorate([
    (0, type_graphql_1.InputType)()
], createContentBlockArgs);
exports.createContentBlockArgs = createContentBlockArgs;
//# sourceMappingURL=createContentBlock.js.map