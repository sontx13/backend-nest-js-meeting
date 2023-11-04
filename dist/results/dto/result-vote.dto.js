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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteResult = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
class VoteResult {
}
exports.VoteResult = VoteResult;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Id Company không được để trống' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], VoteResult.prototype, "_id", void 0);
//# sourceMappingURL=result-vote.dto.js.map