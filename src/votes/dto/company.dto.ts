import {  IsNotEmpty, } from 'class-validator';
import mongoose from 'mongoose';
// class == obj

export class Job{
    @IsNotEmpty({message: 'Id Company không được để trống'})
    _id: mongoose.Schema.Types.ObjectId;
}