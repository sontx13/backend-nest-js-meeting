import { CreateUserCVDto } from './dto/create-resume.dto';
import { IUser } from 'src/users/users.interface';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { Job } from 'src/votes/dto/vote-job.dto';
export declare class ResumesService {
    private resumeModel;
    constructor(resumeModel: SoftDeleteModel<ResumeDocument>);
    create(createUserCVDto: CreateUserCVDto, user: IUser): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Resume> & Resume & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    findAllbyUser(user: IUser): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    findAllbyJob(job: Job): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Resume> & Resume & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    update(id: string, status: string, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
