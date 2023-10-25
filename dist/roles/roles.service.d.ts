import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
export declare class RolesService {
    private roleModel;
    constructor(roleModel: SoftDeleteModel<RoleDocument>);
    create(createRoleDto: CreateRoleDto, user: IUser): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Role> & Role & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Role> & Role & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Role> & Role & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    update(id: string, updateRoleDto: UpdateRoleDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
