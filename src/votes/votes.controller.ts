import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Job } from './dto/vote-job.dto';
//import { ApiTags } from '@nestjs/swagger';

//@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ResponseMessage("Create a new Vote")
  create(@Body() createVoteDto: CreateVoteDto,@User() user:IUser) {
    return this.votesService.create(createVoteDto,user);
  }

  @Post('by-job')
  @Public()
  @ResponseMessage("Get Votes by job")
  findAllbyJob(@Body() job: Job) {
    return this.votesService.findAllbyJob(job);
  }

  @Get()
  @Public()
  @ResponseMessage("Fetch all Votes with paginate")
  findAll(
    @Query("current") currentpage: string,
    @Query("pageSize") limit: string,
    @Query() qs:string
  ) {
    return this.votesService.findAll(+currentpage,+limit,qs);
  }

  @Get(':id')
  @Public()
  @ResponseMessage("Fetch a Vote by id")
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update status Vote")
  update(@Param('id') id: string,@Body("status") status: string,@User() user:IUser) {
    return this.votesService.update(id, status,user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a Vote by id")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.votesService.remove(id,user);
  }
}
