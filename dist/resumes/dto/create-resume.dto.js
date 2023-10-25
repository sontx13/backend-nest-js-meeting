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
exports.CreateUserCVDto = exports.CreateResumeDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
class CreateResumeDto {
}
exports.CreateResumeDto = CreateResumeDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email không đúng định dạng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'userId không được để trống' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateResumeDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Url không được để trống' }),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Status không được để trống' }),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'CompanyId không được để trống' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateResumeDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'JobId không được để trống' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateResumeDto.prototype, "jobId", void 0);
class CreateUserCVDto {
}
exports.CreateUserCVDto = CreateUserCVDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Url không được để trống' }),
    __metadata("design:type", String)
], CreateUserCVDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'CompanyId không được để trống' }),
    (0, class_validator_1.IsMongoId)({ message: 'CompanyId không là mongo id' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateUserCVDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'JobId không được để trống' }),
    (0, class_validator_1.IsMongoId)({ message: 'JobId không là a mongo id' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateUserCVDto.prototype, "jobId", void 0);
//# sourceMappingURL=create-resume.dto.js.map