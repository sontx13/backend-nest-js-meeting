import mongoose from 'mongoose';
export declare class CreateResumeDto {
    email: string;
    userId: mongoose.Schema.Types.ObjectId;
    url: string;
    status: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
}
export declare class CreateUserCVDto {
    url: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
}
