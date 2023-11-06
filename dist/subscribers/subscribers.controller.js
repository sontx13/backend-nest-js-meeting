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
exports.SubscribersController = void 0;
const common_1 = require("@nestjs/common");
const subscribers_service_1 = require("./subscribers.service");
const create_subscriber_dto_1 = require("./dto/create-subscriber.dto");
const update_subscriber_dto_1 = require("./dto/update-subscriber.dto");
const customize_1 = require("../decorator/customize");
let SubscribersController = class SubscribersController {
    constructor(subscribersService) {
        this.subscribersService = subscribersService;
    }
    create(createSubscriberDto, user) {
        return this.subscribersService.create(createSubscriberDto, user);
    }
    findAll(currentpage, limit, qs) {
        return this.subscribersService.findAll(+currentpage, +limit, qs);
    }
    findOne(id) {
        return this.subscribersService.findOne(id);
    }
    update(updateSubscriberDto, user) {
        return this.subscribersService.update(updateSubscriberDto, user);
    }
    getUserSkills(user) {
        return this.subscribersService.getSkills(user);
    }
    remove(id, user) {
        return this.subscribersService.remove(id, user);
    }
};
exports.SubscribersController = SubscribersController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.ResponseMessage)("Create a new subscriber"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscriber_dto_1.CreateSubscriberDto, Object]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.ResponseMessage)("Fetch subscribers with paginate"),
    __param(0, (0, common_1.Query)("current")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.ResponseMessage)("Fetch subscriber by id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, customize_1.SkipCheckPermission)(),
    (0, customize_1.ResponseMessage)("Update a subscriber"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subscriber_dto_1.UpdateSubscriberDto, Object]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('skills'),
    (0, customize_1.SkipCheckPermission)(),
    (0, customize_1.ResponseMessage)("Get subscriber's skills"),
    __param(0, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "getUserSkills", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.ResponseMessage)("Delete a subscriber"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubscribersController.prototype, "remove", null);
exports.SubscribersController = SubscribersController = __decorate([
    (0, common_1.Controller)('subscribers'),
    __metadata("design:paramtypes", [subscribers_service_1.SubscribersService])
], SubscribersController);
//# sourceMappingURL=subscribers.controller.js.map