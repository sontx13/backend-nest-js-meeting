import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateAttendanceDto {
    @IsNotEmpty({message: 'Name không được để trống'})
    name: string;

    @IsNotEmpty({message: 'Access_token không được để trống'})
    access_token: string;

    @IsNotEmpty({message: 'Code không được để trống'})
    code: string;

    @IsNotEmpty({message: 'Latitude không được để trống'})
    latitude: string;

    @IsNotEmpty({message: 'Longitude không được để trống'})
    longitude: string;

    @IsNotEmpty({message: 'IsActive không được để trống'})
    isActive: boolean;

    @IsNotEmpty({message: 'Timestamp không được để trống'})
    timestamp: string;

    @IsNotEmpty({message: 'CompanyId không được để trống'})
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message: 'JobId không được để trống'})
    jobId: mongoose.Schema.Types.ObjectId;
  
}