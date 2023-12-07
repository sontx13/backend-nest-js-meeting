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
exports.AttendancesController = void 0;
const common_1 = require("@nestjs/common");
const attendances_service_1 = require("./attendances.service");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
const customize_1 = require("../decorator/customize");
const vote_job_dto_1 = require("../votes/dto/vote-job.dto");
let AttendancesController = class AttendancesController {
    constructor(attendancesService) {
        this.attendancesService = attendancesService;
    }
    create(createAttendanceDto) {
        return this.attendancesService.create(createAttendanceDto);
    }
    findAllbyJob(job) {
        return this.attendancesService.findAllbyJob(job);
    }
    findAll(currentpage, limit, qs) {
        return this.attendancesService.findAll(+currentpage, +limit, qs);
    }
    findOne(id) {
        return this.attendancesService.findOne(id);
    }
    update(id, updateAttendanceDto) {
        return this.attendancesService.update(id, updateAttendanceDto);
    }
    remove(id, user) {
        return this.attendancesService.remove(id, user);
    }
};
exports.AttendancesController = AttendancesController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.Public)(),
    (0, customize_1.ResponseMessage)("Create a new Attendance"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendancesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('by-job'),
    (0, customize_1.ResponseMessage)("Get Attendances by job"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_job_dto_1.Job]),
    __metadata("design:returntype", void 0)
], AttendancesController.prototype, "findAllbyJob", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)("Fetch all Attendances with paginate"),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Query)("current")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AttendancesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)("Fetch a Attendance by id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendancesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, customize_1.Public)(),
    (0, customize_1.ResponseMessage)("Update status Attendance"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendancesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.ResponseMessage)("Delete a Attendance by id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AttendancesController.prototype, "remove", null);
exports.AttendancesController = AttendancesController = __decorate([
    (0, common_1.Controller)('attendances'),
    __metadata("design:paramtypes", [attendances_service_1.AttendancesService])
], AttendancesController);
//# sourceMappingURL=attendances.controller.js.map