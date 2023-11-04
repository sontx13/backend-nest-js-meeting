import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateResultAppDto {
    @IsNotEmpty({message: 'Answer không được để trống'})
    answer: string;

    @IsNotEmpty({message: 'Phone không được để trống'})
    phone: string;

    @IsNotEmpty({message: 'Token không được để trống'})
    token: string;

    @IsNotEmpty({message: 'Access_token không được để trống'})
    access_token: string;

    @IsNotEmpty({message: 'Access_token không được để trống'})
    name: string;

    @IsNotEmpty({message: 'VoteId không được để trống'})
    voteId: mongoose.Schema.Types.ObjectId;
}
