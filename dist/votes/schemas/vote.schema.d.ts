import mongoose, { HydratedDocument } from 'mongoose';
export type VoteDocument = HydratedDocument<Vote>;
export declare class Vote {
    question: string;
    status: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
}
export declare const VoteSchema: mongoose.Schema<Vote, mongoose.Model<Vote, any, any, any, mongoose.Document<unknown, any, Vote> & Vote & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Vote, mongoose.Document<unknown, {}, Vote> & Vote & {
    _id: mongoose.Types.ObjectId;
}>;
