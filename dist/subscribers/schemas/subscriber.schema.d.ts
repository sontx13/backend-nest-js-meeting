import mongoose, { HydratedDocument } from 'mongoose';
export type SubscriberDocument = HydratedDocument<Subscriber>;
export declare class Subscriber {
    email: string;
    name: string;
    skills: string[];
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
}
export declare const SubscriberSchema: mongoose.Schema<Subscriber, mongoose.Model<Subscriber, any, any, any, mongoose.Document<unknown, any, Subscriber> & Subscriber & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Subscriber, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
    _id: mongoose.Types.ObjectId;
}>;
