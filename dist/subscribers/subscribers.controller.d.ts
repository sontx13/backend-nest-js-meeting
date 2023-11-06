/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="soft-delete-plugin-mongoose/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/users.interface';
export declare class SubscribersController {
    private readonly subscribersService;
    constructor(subscribersService: SubscribersService);
    create(createSubscriberDto: CreateSubscriberDto, user: IUser): Promise<{
        _id: import("mongoose").Types.ObjectId;
        createdAt: Date;
    }>;
    findAll(currentpage: string, limit: string, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    }, "findOne"> | "Not found Subscriber";
    update(updateSubscriberDto: UpdateSubscriberDto, user: IUser): Promise<{
        newSubscriber: import("mongoose").UpdateWriteOpResult;
    }>;
    getUserSkills(user: IUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    } | "Not found Subscriber">;
}
