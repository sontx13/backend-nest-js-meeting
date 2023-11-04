import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResultAppDto } from './dto/create-result.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Result, ResultDocument } from './schemas/result.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { VoteResult } from './dto/result-vote.dto';
import { UpdateResultDto } from './dto/update-result.dto';


@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result.name) private resultModel: SoftDeleteModel<ResultDocument>) {}

  async create(createResultAppDto: CreateResultAppDto) {
    
    let Result = await this.resultModel.create({
        answer: createResultAppDto.answer,
        phone: createResultAppDto.phone,
        token: createResultAppDto.token,
        access_token: createResultAppDto.access_token,
        name: createResultAppDto.name,
        voteId: createResultAppDto.voteId
    })
   
    return {
      _id: Result?._id,
      createdAt: Result?.createdAt
    };
  }

  async findAll(currentpage: number,limit: number,qs: string) {
    const { filter, sort, population,projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentpage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.resultModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.resultModel.find(filter)
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
      let result = this.resultModel.findOne({
        _id:id
      });
      return result;
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }
  }

  async findAllbyVote(vote: VoteResult) {
      //return user;
      return await this.resultModel.find({
        voteId:vote._id
      })
      .sort("-createdAt")
      .populate([
      {
      path: "voteId",
      select: { name: 1 }
      }
      ])

  }

  async update(id: string, updateResultDto: UpdateResultDto) {
    let newResult = await this.resultModel.updateOne(
      {_id:id},
      {
        ...updateResultDto
    })

    return {
      newResult
    };
  }

  async remove(id: string,user:IUser) {
    if(mongoose.Types.ObjectId.isValid(id)){
      await this.resultModel.updateOne(
          {_id:id},
          {
            deletedBy:{
              _id:user._id,
              email:user.email
            }
          }
      )

      return this.resultModel.softDelete({
        _id:id
      });
    }else{
      throw new BadRequestException(`id: ${id} không tồn tại!`)
    }
  }
}
