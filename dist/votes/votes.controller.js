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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const votes_service_1 = require("./votes.service");
const create_vote_dto_1 = require("./dto/create-vote.dto");
const customize_1 = require("../decorator/customize");
const vote_job_dto_1 = require("./dto/vote-job.dto");
let VotesController = class VotesController {
    constructor(votesService) {
        this.votesService = votesService;
    }
    create(createVoteDto, user) {
        return this.votesService.create(createVoteDto, user);
    }
    findAllbyJob(job) {
        return this.votesService.findAllbyJob(job);
    }
    findAll(currentpage, limit, qs) {
        return this.votesService.findAll(+currentpage, +limit, qs);
    }
    findOne(id) {
        return this.votesService.findOne(id);
    }
    update(id, status, user) {
        return this.votesService.update(id, status, user);
    }
    remove(id, user) {
        return this.votesService.remove(id, user);
    }
};
exports.VotesController = VotesController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.ResponseMessage)("Create a new Vote"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vote_dto_1.CreateVoteDto, Object]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('by-job'),
    (0, customize_1.ResponseMessage)("Get Votes by job"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_job_dto_1.Job]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findAllbyJob", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)("Fetch all Votes with paginate"),
    __param(0, (0, common_1.Query)("current")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)("Fetch a Vote by id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, customize_1.ResponseMessage)("Update status Vote"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)("status")),
    __param(2, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.ResponseMessage)("Delete a Vote by id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "remove", null);
exports.VotesController = VotesController = __decorate([
    (0, common_1.Controller)('votes'),
    __metadata("design:paramtypes", [votes_service_1.VotesService])
], VotesController);
//# sourceMappingURL=votes.controller.js.map