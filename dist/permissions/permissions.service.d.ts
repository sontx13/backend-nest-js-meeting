import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
export declare class PermissionsService {
    private permissionModel;
    constructor(permissionModel: SoftDeleteModel<PermissionDocument>);
    create(createPermissionDto: CreatePermissionDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(currentpage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Permission> & Permission & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Permission> & Permission & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
