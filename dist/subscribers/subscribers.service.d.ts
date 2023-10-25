import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
export declare class SubscribersService {
    private subscriberModel;
    constructor(subscriberModel: SoftDeleteModel<SubscriberDocument>);
    create(createSubscriberDto: CreateSubscriberDto, user: IUser): Promise<{
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(currentpage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }, "findOne"> | "Not found Subscriber";
    update(updateSubscriberDto: UpdateSubscriberDto, user: IUser): Promise<{
        newSubscriber: mongoose.UpdateWriteOpResult;
    }>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    } | "Not found Subscriber">;
    getSkills(user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Subscriber> & Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
}
