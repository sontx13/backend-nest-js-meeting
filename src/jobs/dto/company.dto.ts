import {  IsNotEmpty, } from 'class-validator';
import mongoose from 'mongoose';
// class == obj

export class Company{
    @IsNotEmpty({message: 'Id Company không được để trống'})
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({message: 'Name Company không được để trống'})
    name: string;

    @IsNotEmpty({message: 'Logo Company không được để trống'})
    logo: string;
}