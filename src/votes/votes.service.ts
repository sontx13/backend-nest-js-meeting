import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Vote, VoteDocument } from './schemas/vote.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { User } from 'src/decorator/customize';
import { Job } from './dto/vote-job.dto';

@Injectable()
export class VotesService {
  constructor(@InjectModel(Vote.name) private voteModel: SoftDeleteModel<VoteDocument>) {}

  async create(createVoteDto: CreateVoteDto,user:IUser) {
    
    let Vote = await this.voteModel.create({
        question: createVoteDto.question,
        status: "PENDING",
        companyId: createVoteDto.companyId,
        jobId: createVoteDto.jobId,
        createdBy:{
          _id:user._id,
          email:user.email
        }
    })
   
    return {
      _id: Vote?._id,
      createdAt: Vote?.createdAt
    };
  }

  async findAll(currentpage: number,limit: number,qs: string) {
    const { filter, sort, population,projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentpage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.voteModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.voteModel.find(filter)
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
      let vote = this.voteModel.findOne({
        _id:id
      });
      return vote;
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }
  }

  async findAllbyJob(job: Job) {
      //return user;
      return await this.voteModel.find({
        jobId:job._id,
        status:"REVIEWING"
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

 async update(id: string, status: string,user:IUser) {
    if(mongoose.Types.ObjectId.isValid(id)){
        let vote = await this.voteModel.updateOne(
            {_id:id},
            {
              status,
              updatedBy:{
                _id:user._id,
                email:user.email
              }
            }
        )
        return vote;
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }       
  }

  async remove(id: string,user:IUser) {
    if(mongoose.Types.ObjectId.isValid(id)){
      await this.voteModel.updateOne(
          {_id:id},
          {
            deletedBy:{
              _id:user._id,
              email:user.email
            }
          }
      )

      return this.voteModel.softDelete({
        _id:id
      });
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }
  }
}
