import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from './schemas/job.schemas';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { Company } from './dto/company.dto';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: SoftDeleteModel<JobDocument>);
    create(createJobDto: CreateJobDto, user: IUser): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Job> & Job & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }, "findOne"> | "Not found job";
    findAllbyCompany(company: Company): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    update(id: string, updateJobDto: UpdateJobDto, user: IUser): Promise<{
        newJob: mongoose.UpdateWriteOpResult;
    }>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    } | "Not found job">;
}
