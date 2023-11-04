import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateResultAppDto } from './dto/create-result.dto';
import { VoteResult } from './dto/result-vote.dto';
import { UpdateResultDto } from './dto/update-result.dto';

//import { ApiTags } from '@nestjs/swagger';

//@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @Public()
  @ResponseMessage("Create a new Result")
  create(@Body() createResultDto: CreateResultAppDto) {
    return this.resultsService.create(createResultDto);
  }

  @Public()
  @Post('by-vote')
  @ResponseMessage("Get Results by vote")
  findAllbyVote(@Body() vote: VoteResult) {
    return this.resultsService.findAllbyVote(vote);
  }

  @Get()
  @ResponseMessage("Fetch all Results with paginate")
  findAll(
    @Query("current") currentpage: string,
    @Query("pageSize") limit: string,
    @Query() qs:string
  ) {
    return this.resultsService.findAll(+currentpage,+limit,qs);
  }
  
  @Get(':id')
  @ResponseMessage("Fetch a Result by id")
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ResponseMessage("Update status Result")
  update(@Param('id') id: string,@Body() updateResultDto: UpdateResultDto) {
    return this.resultsService.update(id, updateResultDto);
  }

  @Delete(':id')
  @ResponseMessage("Delete a Result by id")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.resultsService.remove(id,user);
  }
}
