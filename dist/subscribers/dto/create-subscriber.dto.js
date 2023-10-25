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
exports.CreateSubscriberDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSubscriberDto {
}
exports.CreateSubscriberDto = CreateSubscriberDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name không được để trống' }),
    __metadata("design:type", String)
], CreateSubscriberDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], CreateSubscriberDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Skills không được để trống' }),
    (0, class_validator_1.IsArray)({ message: 'Skills có định dạng là Array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Mỗi Skill trong Array có định dạng là string' }),
    __metadata("design:type", Array)
], CreateSubscriberDto.prototype, "skills", void 0);
//# sourceMappingURL=create-subscriber.dto.js.map