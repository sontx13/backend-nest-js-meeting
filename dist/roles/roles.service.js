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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const customize_1 = require("../decorator/customize");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("./schemas/role.schema");
const mongoose_2 = __importDefault(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
const sample_1 = require("../databases/sample");
let RolesService = class RolesService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(createRoleDto, user) {
        const isExist = await this.roleModel.findOne({ name: createRoleDto.name });
        if (isExist) {
            throw new common_1.BadRequestException(`Name: ${createRoleDto.name} đã tồn tại!`);
        }
        let newRole = await this.roleModel.create(Object.assign(Object.assign({}, createRoleDto), { createdBy: {
                _id: user._id,
                email: user.email
            } }));
        return {
            _id: newRole === null || newRole === void 0 ? void 0 : newRole._id,
            createdAt: newRole === null || newRole === void 0 ? void 0 : newRole.createdAt
        };
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.roleModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.roleModel.find(filter)
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
            throw new common_1.BadRequestException(`Not found role with id: ${id} !`);
        }
        return this.roleModel.findOne({
            _id: id
        }).populate({ path: "permissions", select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 } });
    }
    async update(id, updateRoleDto, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Not found role with id: ${id} !`);
        }
        let newRole = await this.roleModel.updateOne({ _id: id }, Object.assign(Object.assign({}, updateRoleDto), { updatedBy: {
                _id: user._id,
                email: user.email
            } }));
        return newRole;
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            const foundUser = await this.roleModel.findById(id);
            if (foundUser.name === sample_1.ADMIN_ROLE) {
                throw new common_1.BadRequestException(`Không thể xoá quyền  ${sample_1.ADMIN_ROLE}`);
            }
            await this.roleModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.roleModel.softDelete({
                _id: id
            });
        }
        else {
            throw new common_1.BadRequestException(`Not found role with id: ${id} !`);
        }
    }
};
exports.RolesService = RolesService;
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "create", null);
__decorate([
    __param(2, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "update", null);
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RolesService.prototype, "remove", null);
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object])
], RolesService);
//# sourceMappingURL=roles.service.js.map