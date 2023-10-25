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
exports.ResumesController = void 0;
const common_1 = require("@nestjs/common");
const resumes_service_1 = require("./resumes.service");
const create_resume_dto_1 = require("./dto/create-resume.dto");
const customize_1 = require("../decorator/customize");
let ResumesController = class ResumesController {
    constructor(resumesService) {
        this.resumesService = resumesService;
    }
    create(createUserCVDto, user) {
        return this.resumesService.create(createUserCVDto, user);
    }
    findAllbyUser(user) {
        return this.resumesService.findAllbyUser(user);
    }
    findAll(currentpage, limit, qs) {
        return this.resumesService.findAll(+currentpage, +limit, qs);
    }
    findOne(id) {
        return this.resumesService.findOne(id);
    }
    update(id, status, user) {
        return this.resumesService.update(id, status, user);
    }
    remove(id, user) {
        return this.resumesService.remove(id, user);
    }
};
exports.ResumesController = ResumesController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.ResponseMessage)("Create a new resume"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resume_dto_1.CreateUserCVDto, Object]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('by-user'),
    (0, customize_1.ResponseMessage)("Get Resumes by User"),
    __param(0, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "findAllbyUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)("Fetch all resumes with paginate"),
    __param(0, (0, common_1.Query)("current")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)("Fetch a resume by id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, customize_1.ResponseMessage)("Update status resume"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)("status")),
    __param(2, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.ResponseMessage)("Delete a resume by id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResumesController.prototype, "remove", null);
exports.ResumesController = ResumesController = __decorate([
    (0, common_1.Controller)('resumes'),
    __metadata("design:paramtypes", [resumes_service_1.ResumesService])
], ResumesController);
//# sourceMappingURL=resumes.controller.js.map