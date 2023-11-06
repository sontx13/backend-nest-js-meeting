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
exports.CreateAttendanceDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
class CreateAttendanceDto {
}
exports.CreateAttendanceDto = CreateAttendanceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name không được để trống' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Access_token không được để trống' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "access_token", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Code không được để trống' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Latitude không được để trống' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Longitude không được để trống' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'IsActive không được để trống' }),
    __metadata("design:type", Boolean)
], CreateAttendanceDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Timestamp không được để trống' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "timestamp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'CompanyId không được để trống' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateAttendanceDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'JobId không được để trống' }),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], CreateAttendanceDto.prototype, "jobId", void 0);
//# sourceMappingURL=create-attendance.dto.js.map