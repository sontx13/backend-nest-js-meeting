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
exports.ResumesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const resume_schema_1 = require("./schemas/resume.schema");
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
let ResumesService = class ResumesService {
    constructor(resumeModel) {
        this.resumeModel = resumeModel;
    }
    async create(createUserCVDto, user) {
        let resume = await this.resumeModel.create({
            email: user.email,
            userId: user._id,
            url: createUserCVDto.url,
            status: "PENDING",
            companyId: createUserCVDto.companyId,
            jobId: createUserCVDto.jobId,
            history: [
                {
                    status: "PENDING",
                    updatedAt: new Date,
                    updatedBy: {
                        _id: user._id,
                        email: user.email
                    }
                }
            ],
            createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return {
            _id: resume === null || resume === void 0 ? void 0 : resume._id,
            createdAt: resume === null || resume === void 0 ? void 0 : resume.createdAt
        };
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.resumeModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.resumeModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .populate(population)
            .select(projection)
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
            let user = this.resumeModel.findOne({
                _id: id
            });
            return user;
        }
        else {
            throw new common_1.BadRequestException(`id: ${id} không tồn tại!`);
        }
    }
    async findAllbyUser(user) {
        return await this.resumeModel.find({
            userId: user._id
        })
            .sort("-createdAt")
            .populate([
            {
                path: "companyId",
                select: { name: 1 }
            },
            {
                path: "jobId",
                select: { name: 1 }
            }
        ]);
    }
    async findAllbyJob(job) {
        return await this.resumeModel.find({
            jobId: job._id
        })
            .sort("-createdAt")
            .populate([
            {
                path: "companyId",
                select: { name: 1 }
            },
            {
                path: "jobId",
                select: { name: 1 }
            }
        ]);
    }
    async update(id, status, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            let resume = await this.resumeModel.updateOne({ _id: id }, {
                status,
                $push: { history: {
                        status,
                        updatedAt: new Date,
                        updatedBy: {
                            _id: user._id,
                            email: user.email
                        }
                    }
                },
                updatedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return resume;
        }
        else {
            throw new common_1.BadRequestException(`id: ${id} không tồn tại!`);
        }
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            await this.resumeModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.resumeModel.softDelete({
                _id: id
            });
        }
        else {
            throw new common_1.BadRequestException(`id: ${id} không tồn tại!`);
        }
    }
};
exports.ResumesService = ResumesService;
exports.ResumesService = ResumesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resume_schema_1.Resume.name)),
    __metadata("design:paramtypes", [Object])
], ResumesService);
//# sourceMappingURL=resumes.service.js.map