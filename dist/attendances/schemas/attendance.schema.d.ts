import mongoose, { HydratedDocument } from 'mongoose';
export type AttendanceDocument = HydratedDocument<Attendance>;
export declare class Attendance {
    name: string;
    access_token: string;
    code: string;
    latitude: string;
    longitude: string;
    isActive: boolean;
    timestamp: string;
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
export declare const AttendanceSchema: mongoose.Schema<Attendance, mongoose.Model<Attendance, any, any, any, mongoose.Document<unknown, any, Attendance> & Attendance & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attendance, mongoose.Document<unknown, {}, Attendance> & Attendance & {
    _id: mongoose.Types.ObjectId;
}>;
