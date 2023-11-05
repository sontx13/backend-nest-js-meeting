import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { User } from 'src/decorator/customize';
import { Job } from 'src/votes/dto/vote-job.dto';

@Injectable()
export class AttendancesService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: SoftDeleteModel<AttendanceDocument>) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    
    let Attendance = await this.attendanceModel.create({
        name: createAttendanceDto.name,
        access_token: createAttendanceDto.access_token,
        code: createAttendanceDto.code,
        latitude: createAttendanceDto.latitude,
        longitude: createAttendanceDto.longitude,
        isActive: createAttendanceDto.isActive,
        timestamp: createAttendanceDto.timestamp,
        companyId: createAttendanceDto.companyId,
        jobId: createAttendanceDto.jobId
    })
   
    return {
      _id: Attendance?._id,
      createdAt: Attendance?.createdAt
    };
  }

  async findAll(currentpage: number,limit: number,qs: string) {
    const { filter, sort, population,projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentpage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.attendanceModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.attendanceModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore: Unreachable code error
    .sort(sort)
    .populate(population)
    .select(projection as any)
    .exec();

    return {
      meta: {
      current: currentpage, //trang hiện tại
      pageSize: limit, //số lượng bản ghi đã lấy
      pages: totalPages, //tổng số trang với điều kiện query
      total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  findOne(id: string) {
    if(mongoose.Types.ObjectId.isValid(id)){
      let attendance = this.attendanceModel.findOne({
        _id:id
      });
      return attendance;
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }
  }

  async findAllbyJob(job: Job) {
      //return user;
      return await this.attendanceModel.find({
        jobId:job._id
      })
      .sort("-createdAt")
      .populate([
      {
      path: "companyId",
      select: { name: 1 }
      },
      {
      path: "jobId",
      select: { name: 1 }
      }
      ])

  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    let newResult = await this.attendanceModel.updateOne(
      {_id:id},
      {
        ...updateAttendanceDto
    })

    return {
      newResult
    };
  }

  async remove(id: string,user:IUser) {
    if(mongoose.Types.ObjectId.isValid(id)){
      await this.attendanceModel.updateOne(
          {_id:id},
          {
            deletedBy:{
              _id:user._id,
              email:user.email
            }
          }
      )

      return this.attendanceModel.softDelete({
        _id:id
      });
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }
  }
}
