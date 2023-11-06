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
exports.SubscribersService = void 0;
const common_1 = require("@nestjs/common");
const create_subscriber_dto_1 = require("./dto/create-subscriber.dto");
const mongoose_1 = require("@nestjs/mongoose");
const customize_1 = require("../decorator/customize");
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
const subscriber_schema_1 = require("./schemas/subscriber.schema");
let SubscribersService = class SubscribersService {
    constructor(subscriberModel) {
        this.subscriberModel = subscriberModel;
    }
    async create(createSubscriberDto, user) {
        const isExist = await this.subscriberModel.findOne({ email: createSubscriberDto.email });
        if (isExist) {
            throw new common_1.BadRequestException(`email: ${createSubscriberDto.email} đã tồn tại!`);
        }
        let newSubscriber = await this.subscriberModel.create(Object.assign(Object.assign({}, createSubscriberDto), { createdBy: {
                _id: user._id,
                email: user.email
            } }));
        return {
            _id: newSubscriber === null || newSubscriber === void 0 ? void 0 : newSubscriber._id,
            createdAt: newSubscriber === null || newSubscriber === void 0 ? void 0 : newSubscriber.createdAt
        };
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.subscriberModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.subscriberModel.find(filter)
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
            let Subscriber = this.subscriberModel.findOne({
                _id: id
            });
            return Subscriber;
        }
        else {
            return `Not found Subscriber`;
        }
    }
    async update(updateSubscriberDto, user) {
        const newSubscriber = await this.subscriberModel.updateOne({ email: user.email }, Object.assign(Object.assign({}, updateSubscriberDto), { updatedBy: {
                _id: user._id,
                email: user.email
            } }), { upsert: true });
        return {
            newSubscriber
        };
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            await this.subscriberModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.subscriberModel.softDelete({
                _id: id
            });
        }
        else {
            return `Not found Subscriber`;
        }
    }
    async getSkills(user) {
        const { email } = user;
        return await this.subscriberModel.findOne({ email }, {
            skills: 1
        });
    }
};
exports.SubscribersService = SubscribersService;
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscriber_dto_1.CreateSubscriberDto, Object]),
    __metadata("design:returntype", Promise)
], SubscribersService.prototype, "create", null);
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubscribersService.prototype, "remove", null);
__decorate([
    __param(0, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscribersService.prototype, "getSkills", null);
exports.SubscribersService = SubscribersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscriber_schema_1.Subscriber.name)),
    __metadata("design:paramtypes", [Object])
], SubscribersService);
//# sourceMappingURL=subscribers.service.js.map