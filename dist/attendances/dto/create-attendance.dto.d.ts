import mongoose from 'mongoose';
export declare class CreateAttendanceDto {
    name: string;
    access_token: string;
    code: string;
    latitude: string;
    longitude: string;
    isActive: string;
    timestamp: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
}
