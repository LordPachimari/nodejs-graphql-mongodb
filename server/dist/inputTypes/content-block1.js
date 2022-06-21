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
exports.ContentBlock1 = void 0;
const rich_text_1 = require("../inputTypes/rich_text");
const type_graphql_1 = require("type-graphql");
let ContentBlock1 = class ContentBlock1 {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ContentBlock1.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [rich_text_1.RichText]),
    __metadata("design:type", Array)
], ContentBlock1.prototype, "rich_text", void 0);
ContentBlock1 = __decorate([
    (0, type_graphql_1.InputType)()
], ContentBlock1);
exports.ContentBlock1 = ContentBlock1;
//# sourceMappingURL=content-block1.js.map