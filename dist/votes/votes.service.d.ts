import { CreateVoteDto } from './dto/create-vote.dto';
import { IUser } from 'src/users/users.interface';
import { Vote, VoteDocument } from './schemas/vote.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { Job } from './dto/company.dto';
export declare class VotesService {
    private voteModel;
    constructor(voteModel: SoftDeleteModel<VoteDocument>);
    create(createVoteDto: CreateVoteDto, user: IUser): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Vote> & Vote & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Vote> & Vote & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    findAllbyJob(job: Job): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Vote> & Vote & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    update(id: string, status: string, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
