import { CreateResultAppDto } from './dto/create-result.dto';
import { IUser } from 'src/users/users.interface';
import { Result, ResultDocument } from './schemas/result.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { VoteResult } from './dto/result-vote.dto';
import { UpdateResultDto } from './dto/update-result.dto';
export declare class ResultsService {
    private resultModel;
    constructor(resultModel: SoftDeleteModel<ResultDocument>);
    create(createResultAppDto: CreateResultAppDto): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Result> & Result & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Result> & Result & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    findAllbyVote(vote: VoteResult): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Result> & Result & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    update(id: string, updateResultDto: UpdateResultDto): Promise<{
        newResult: mongoose.UpdateWriteOpResult;
    }>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
