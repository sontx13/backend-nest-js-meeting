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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const customize_1 = require("../decorator/customize");
const local_auth_guard_1 = require("./local-auth.guard");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const roles_service_1 = require("../roles/roles.service");
let AuthController = class AuthController {
    constructor(authService, roleService) {
        this.authService = authService;
        this.roleService = roleService;
    }
    handleLogin(req, response) {
        return this.authService.login(req.user, response);
    }
    handleRegister(registerUserDto) {
        return this.authService.register(registerUserDto);
    }
    async handleAccount(user) {
        const temp = await this.roleService.findOne(user.role._id);
        user.permissions = temp.permissions;
        return { user };
    }
    handleRefreshToken(request, response) {
        const refresh_token = request.cookies['refresh_token'];
        return this.authService.processNewToken(refresh_token, response);
    }
    handleLogout(user, response) {
        return this.authService.logout(user, response);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    (0, customize_1.ResponseMessage)("User Login"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, customize_1.Public)(),
    (0, customize_1.ResponseMessage)("Register a user"),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleRegister", null);
__decorate([
    (0, common_1.Get)('account'),
    (0, customize_1.ResponseMessage)("Get user information"),
    __param(0, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleAccount", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)('refresh'),
    (0, customize_1.ResponseMessage)("Get User by refresh token"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleRefreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, customize_1.ResponseMessage)("Logout User"),
    __param(0, (0, customize_1.User)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        roles_service_1.RolesService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map