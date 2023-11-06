import mongoose, { HydratedDocument } from 'mongoose';
export type ResultDocument = HydratedDocument<Result>;
export declare class Result {
    answer: string;
    phone: string;
    token: string;
    access_token: string;
    name: string;
    voteId: mongoose.Schema.Types.ObjectId;
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
export declare const ResultSchema: mongoose.Schema<Result, mongoose.Model<Result, any, any, any, mongoose.Document<unknown, any, Result> & Result & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Result, mongoose.Document<unknown, {}, Result> & Result & {
    _id: mongoose.Types.ObjectId;
}>;
