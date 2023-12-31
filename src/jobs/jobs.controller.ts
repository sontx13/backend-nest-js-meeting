import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
//import { ApiTags } from '@nestjs/swagger';
import { Company } from './dto/company.dto';

//@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage("Create a new Job")
  create(@Body() createJobDto: CreateJobDto,@User() user:IUser) {
    return this.jobsService.create(createJobDto,user);
  }

  @Public()
  @Get()
  @ResponseMessage("Fetch jobs with pagination")
  findAll(
    @Query("current") currentpage: string,
    @Query("pageSize") limit: string,
    @Query() qs:string
  ) {
    return this.jobsService.findAll(+currentpage,+limit,qs);
  }

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch a job by id")
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Post('by-company')
  @Public()
  @ResponseMessage("Get Job by Company")
  findAllbyCompany(@Body() company: Company) {
    //return company;
    return this.jobsService.findAllbyCompany(company);
  }

  @Patch(':id')
  @ResponseMessage("Update a Job")
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto,@User() user:IUser) {
    return this.jobsService.update(id, updateJobDto,user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a job")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.jobsService.remove(id,user);
  }
}
