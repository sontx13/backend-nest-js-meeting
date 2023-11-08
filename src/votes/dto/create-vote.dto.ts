import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateVoteDto {
    @IsNotEmpty({message: 'Question không được để trống'})
    question: string;

    @IsNotEmpty({message: 'CompanyId không được để trống'})
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message: 'JobId không được để trống'})
    jobId: mongoose.Schema.Types.ObjectId;
  
}