import mongoose from 'mongoose';
export declare class CreateVoteDto {
    question: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
}
