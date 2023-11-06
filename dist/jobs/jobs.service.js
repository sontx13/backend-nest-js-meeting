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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
const mongoose_1 = require("@nestjs/mongoose");
const job_schemas_1 = require("./schemas/job.schemas");
const customize_1 = require("../decorator/customize");
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
let JobsService = class JobsService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async create(createJobDto, user) {
        let newJob = await this.jobModel.create(Object.assign(Object.assign({}, createJobDto), { createdBy: {
                _id: user._id,
                email: user.email
            } }));
        return {
            _id: newJob === null || newJob === void 0 ? void 0 : newJob._id,
            createdAt: newJob === null || newJob === void 0 ? void 0 : newJob.createdAt
        };
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.jobModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.jobModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .populate(population)
            .exec();
        return {
            meta: {
                current: currentpage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems
            },
            result
        };
    }
    findOne(id) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            let job = this.jobModel.findOne({
                _id: id
            });
            return job;
        }
        else {
            return `Not found job`;
        }
    }
    async findAllbyCompany(company) {
        return await this.jobModel.find({
            company: company
        })
            .sort("-createdAt");
    }
    async update(id, updateJobDto, user) {
        let newJob = await this.jobModel.updateOne({ _id: id }, Object.assign(Object.assign({}, updateJobDto), { isActive: true, updatedBy: {
                _id: user._id,
                email: user.email
            } }));
        return {
            newJob
        };
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            await this.jobModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.jobModel.softDelete({
                _id: id
            });
        }
        else {
            return `Not found job`;
        }
    }
};
exports.JobsService = JobsService;
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto, Object]),
    __metadata("design:returntype", Promise)
], JobsService.prototype, "create", null);
__decorate([
    __param(2, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_dto_1.UpdateJobDto, Object]),
    __metadata("design:returntype", Promise)
], JobsService.prototype, "update", null);
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsService.prototype, "remove", null);
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schemas_1.Job.name)),
    __metadata("design:paramtypes", [Object])
], JobsService);
//# sourceMappingURL=jobs.service.js.map