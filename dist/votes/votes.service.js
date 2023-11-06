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
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const vote_schema_1 = require("./schemas/vote.schema");
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
let VotesService = class VotesService {
    constructor(voteModel) {
        this.voteModel = voteModel;
    }
    async create(createVoteDto, user) {
        let Vote = await this.voteModel.create({
            question: createVoteDto.question,
            status: createVoteDto.status,
            companyId: createVoteDto.companyId,
            jobId: createVoteDto.jobId,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return {
            _id: Vote === null || Vote === void 0 ? void 0 : Vote._id,
            createdAt: Vote === null || Vote === void 0 ? void 0 : Vote.createdAt
        };
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population, projection } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.voteModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.voteModel.find(filter)
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
            let vote = this.voteModel.findOne({
                _id: id
            });
            return vote;
        }
        else {
            throw new common_1.BadRequestException(`id: ${id} không tồn tại!`);
        }
    }
    async findAllbyJob(job) {
        return await this.voteModel.find({
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
            let vote = await this.voteModel.updateOne({ _id: id }, {
                status,
                updatedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return vote;
        }
        else {
            throw new common_1.BadRequestException(`id: ${id} không tồn tại!`);
        }
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            await this.voteModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.voteModel.softDelete({
                _id: id
            });
        }
        else {
            throw new common_1.BadRequestException(`id: ${id} không tồn tại!`);
        }
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vote_schema_1.Vote.name)),
    __metadata("design:paramtypes", [Object])
], VotesService);
//# sourceMappingURL=votes.service.js.map