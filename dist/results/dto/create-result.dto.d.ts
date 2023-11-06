import mongoose from "mongoose";
export declare class CreateResultAppDto {
    answer: string;
    phone: string;
    token: string;
    access_token: string;
    name: string;
    voteId: mongoose.Schema.Types.ObjectId;
}
