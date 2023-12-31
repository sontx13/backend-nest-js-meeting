import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCVDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Job } from 'src/votes/dto/vote-job.dto';

//import { ApiTags } from '@nestjs/swagger';

//@ApiTags('resumes')
@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage("Create a new resume")
  create(@Body() createUserCVDto: CreateUserCVDto,@User() user:IUser) {
    return this.resumesService.create(createUserCVDto,user);
  }

  @Post('by-user')
  @ResponseMessage("Get Resumes by User")
  findAllbyUser(@User() user:IUser) {
    return this.resumesService.findAllbyUser(user);
  }

  @Post('by-job')
  @ResponseMessage("Get Resumes by job")
  @Public()
  findAllbyJob(@Body() job: Job) {
    return this.resumesService.findAllbyJob(job);
  }

  @Get()
  @ResponseMessage("Fetch all resumes with paginate")
  @Public()
  findAll(
    @Query("current") currentpage: string,
    @Query("pageSize") limit: string,
    @Query() qs:string
  ) {
    return this.resumesService.findAll(+currentpage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a resume by id")
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update status resume")
  update(@Param('id') id: string, @Body("status") status: string,@User() user:IUser) {
    return this.resumesService.update(id, status,user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a resume by id")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.resumesService.remove(id,user);
  }
}
