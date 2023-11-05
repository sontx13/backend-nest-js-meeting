import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { IUser } from 'src/users/users.interface';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { Job } from 'src/votes/dto/vote-job.dto';
export declare class AttendancesService {
    private attendanceModel;
    constructor(attendanceModel: SoftDeleteModel<AttendanceDocument>);
    create(createAttendanceDto: CreateAttendanceDto): Promise<{
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
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Attendance> & Attendance & {
            _id: mongoose.Types.ObjectId;
        }> & mongoose.Document<unknown, {}, Attendance> & Attendance & {
            _id: mongoose.Types.ObjectId;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>[];
    }>;
    findOne(id: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    }, "findOne">;
    findAllbyJob(job: Job): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Attendance> & Attendance & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<{
        newResult: mongoose.UpdateWriteOpResult;
    }>;
    remove(id: string, user: IUser): Promise<{
        deleted: number;
    }>;
}
