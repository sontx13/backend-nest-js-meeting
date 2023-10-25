import mongoose, { HydratedDocument } from 'mongoose';
export type JobDocument = HydratedDocument<Job>;
export declare class Job {
    name: string;
    skills: string[];
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        logo: string;
    };
    location: string;
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
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
export declare const JobSchema: mongoose.Schema<Job, mongoose.Model<Job, any, any, any, mongoose.Document<unknown, any, Job> & Job & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Job, mongoose.Document<unknown, {}, Job> & Job & {
    _id: mongoose.Types.ObjectId;
}>;
