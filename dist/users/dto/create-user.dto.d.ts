import mongoose from 'mongoose';
declare class Company {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    address: string;
    role: mongoose.Schema.Types.ObjectId;
    company: Company;
}
export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    address: string;
}
export declare class UserLoginDto {
    readonly username: string;
    readonly password: string;
}
export {};
