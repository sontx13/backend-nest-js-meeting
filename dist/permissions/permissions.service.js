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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const mongoose_1 = require("@nestjs/mongoose");
const permission_schema_1 = require("./schemas/permission.schema");
const customize_1 = require("../decorator/customize");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
let PermissionsService = class PermissionsService {
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async create(createPermissionDto, user) {
        const isExist = await this.permissionModel.findOne({ apiPath: createPermissionDto.apiPath, method: createPermissionDto.method });
        if (isExist) {
            throw new common_1.BadRequestException(`apiPath: ${createPermissionDto.apiPath} và method: ${createPermissionDto.method} đã tồn tại!`);
        }
        let newPermission = await this.permissionModel.create(Object.assign(Object.assign({}, createPermissionDto), { createdBy: {
                _id: user._id,
                email: user.email
            } }));
        return {
            _id: newPermission === null || newPermission === void 0 ? void 0 : newPermission._id,
            createdAt: newPermission === null || newPermission === void 0 ? void 0 : newPermission.createdAt
        };
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.permissionModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.permissionModel.find(filter)
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
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Not found permission with id: ${id} !`);
        }
        return this.permissionModel.findOne({
            _id: id
        });
    }
    async update(id, updatePermissionDto, user) {
        let newPermission = await this.permissionModel.updateOne({ _id: id }, Object.assign(Object.assign({}, updatePermissionDto), { updatedBy: {
                _id: user._id,
                email: user.email
            } }));
        return newPermission;
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            await this.permissionModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.permissionModel.softDelete({
                _id: id
            });
        }
        else {
            throw new common_1.BadRequestException(`Not found permission with id: ${id} !`);
        }
    }
};
exports.PermissionsService = PermissionsService;
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsService.prototype, "create", null);
__decorate([
    __param(2, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permission_dto_1.UpdatePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsService.prototype, "update", null);
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PermissionsService.prototype, "remove", null);
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [Object])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map