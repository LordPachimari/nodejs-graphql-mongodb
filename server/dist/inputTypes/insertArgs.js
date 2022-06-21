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
exports.ContentBlocksToInsert = void 0;
const type_graphql_1 = require("type-graphql");
const contentBlockInput_1 = require("./contentBlockInput");
let ContentBlocksToInsert = class ContentBlocksToInsert {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", contentBlockInput_1.ContentBlockInput)
], ContentBlocksToInsert.prototype, "contentBlock", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ContentBlocksToInsert.prototype, "position", void 0);
ContentBlocksToInsert = __decorate([
    (0, type_graphql_1.InputType)()
], ContentBlocksToInsert);
exports.ContentBlocksToInsert = ContentBlocksToInsert;
//# sourceMappingURL=insertArgs.js.map