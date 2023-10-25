/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="soft-delete-plugin-mongoose/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request as RequestEx, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
export declare class AuthController {
    private authService;
    private roleService;
    constructor(authService: AuthService, roleService: RolesService);
    handleLogin(req: any, response: Response): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            _id: string;
            name: string;
            email: string;
            role: {
                _id: string;
                name: string;
            };
            permissions: {
                _id: string;
                name: string;
                apiPath: string;
                module: string;
            }[];
        };
    }>;
    handleRegister(registerUserDto: RegisterUserDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    handleAccount(user: IUser): Promise<{
        user: IUser;
    }>;
    handleRefreshToken(request: RequestEx, response: Response): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("mongoose").Schema.Types.ObjectId;
            permissions: import("../permissions/schemas/permission.schema").Permission[];
        };
    }>;
    handleLogout(user: IUser, response: Response): Promise<string>;
}
