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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = __importDefault(require("mongoose"));
const bcryptjs_1 = require("bcryptjs");
const customize_1 = require("../decorator/customize");
const api_query_params_1 = __importDefault(require("api-query-params"));
const role_schema_1 = require("../roles/schemas/role.schema");
const sample_1 = require("../databases/sample");
let UsersService = class UsersService {
    constructor(userModel, roleModel) {
        this.userModel = userModel;
        this.roleModel = roleModel;
        this.getHashPassword = (password) => {
            var salt = (0, bcryptjs_1.genSaltSync)(10);
            var hash = (0, bcryptjs_1.hashSync)(password, salt);
            return hash;
        };
        this.updateUserToken = async (refreshToken, _id) => {
            return await this.userModel.updateOne({ _id }, { refreshToken });
        };
        this.findUserByToken = async (refreshToken) => {
            return (await this.userModel.findOne({ refreshToken }))
                .populate({
                path: "role",
                select: { name: 1 }
            });
        };
    }
    async create(createUserDto, user) {
        const isExist = await this.userModel.findOne({ email: createUserDto.email });
        if (isExist) {
            throw new common_1.BadRequestException(`Email: ${createUserDto.email} đã tồn tại!`);
        }
        const hashPassword = this.getHashPassword(createUserDto.password);
        let newUser = await this.userModel.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashPassword,
            age: createUserDto.age,
            gender: createUserDto.gender,
            address: createUserDto.address,
            role: createUserDto.role,
            company: createUserDto.company,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return {
            _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
            createdAt: newUser === null || newUser === void 0 ? void 0 : newUser.createdAt
        };
    }
    async register(registerUserDto) {
        const isExist = await this.userModel.findOne({ email: registerUserDto.email });
        if (isExist) {
            throw new common_1.BadRequestException(`Email: ${registerUserDto.email} đã tồn tại!`);
        }
        const userRole = await this.roleModel.findOne({ name: sample_1.USER_ROLE });
        const hashPassword = this.getHashPassword(registerUserDto.password);
        let user = await this.userModel.create({
            name: registerUserDto.name,
            email: registerUserDto.email,
            password: hashPassword,
            age: registerUserDto.age,
            gender: registerUserDto.gender,
            address: registerUserDto.address,
            role: userRole === null || userRole === void 0 ? void 0 : userRole._id,
        });
        return user;
    }
    async findAll(currentpage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentpage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.userModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .select("-password")
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
            return this.userModel.findOne({
                _id: id
            }).select("-password")
                .populate({ path: "role", select: { name: 1, _id: 1 } });
        }
        else {
            return `Not found user`;
        }
    }
    findOneByUsername(username) {
        let user = this.userModel.findOne({
            email: username
        }).populate({ path: "role", select: { name: 1 } });
        return user;
    }
    isValidPassword(password, hash) {
        return (0, bcryptjs_1.compareSync)(password, hash);
    }
    async update(updateUserDto, user) {
        let newUser = await this.userModel.updateOne({ _id: updateUserDto._id }, {
            name: updateUserDto.name,
            age: updateUserDto.age,
            gender: updateUserDto.gender,
            address: updateUserDto.address,
            role: updateUserDto.role,
            updatedBy: {
                _id: user._id,
                email: user.email
            }
        });
        return newUser;
    }
    async remove(id, user) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            const foundUser = await this.userModel.findById(id);
            if (foundUser && foundUser.email === "admin@gmail.com") {
                throw new common_1.BadRequestException("Không thể xoá tài khoản admin@gmail.com");
            }
            await this.userModel.updateOne({ _id: id }, {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            });
            return this.userModel.softDelete({
                _id: id
            });
        }
        else {
            return `Not found user`;
        }
    }
};
exports.UsersService = UsersService;
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "update", null);
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "remove", null);
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map