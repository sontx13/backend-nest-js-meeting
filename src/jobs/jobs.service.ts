import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from './schemas/job.schemas';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { Company } from './dto/company.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: SoftDeleteModel<JobDocument>) {}

  async create(createJobDto: CreateJobDto,@User() user:IUser) {
    let newJob = await this.jobModel.create({
        ...createJobDto,
        createdBy:{
          _id:user._id,
          email:user.email
        }
    })
  
    return {
      _id: newJob?._id,
      createdAt: newJob?.createdAt
    };
  }

  async findAll(currentpage: number,limit: number,qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentpage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.jobModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore: Unreachable code error
    .sort(sort)
    .populate(population)
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
      let job = this.jobModel.findOne({
        _id:id
      });
      return job;
    }else{
      return `Not found job`;
    }
  }

  async findAllbyCompany(company: Company) {
      //return user;
      return await this.jobModel.find({
        company:company
      })
      .sort("-createdAt");
  }


  async update(id: string, updateJobDto: UpdateJobDto,@User() user:IUser) {
    let newJob = await this.jobModel.updateOne(
      {_id:id},
      {
        ...updateJobDto,
        isActive:true,
        updatedBy:{
          _id:user._id,
          email:user.email
        }
    })

    return {
      newJob
    };
  }

  async remove(id: string,@User() user:IUser) {
    if(mongoose.Types.ObjectId.isValid(id)){
      await this.jobModel.updateOne(
          {_id:id},
          {
            deletedBy:{
              _id:user._id,
              email:user.email
            }
          }
      )

      return this.jobModel.softDelete({
        _id:id
      });
    }else{
      return `Not found job`;
    }
  }
}
