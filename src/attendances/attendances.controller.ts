import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { Job } from 'src/votes/dto/vote-job.dto';

//import { ApiTags } from '@nestjs/swagger';

//@ApiTags('attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  @Public()
  @ResponseMessage("Create a new Attendance")
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(createAttendanceDto);
  }

  @Post('by-job')
  @ResponseMessage("Get Attendances by job")
  @Public()
  findAllbyJob(@Body() job: Job) {
    return this.attendancesService.findAllbyJob(job);
  }

  @Get()
  @ResponseMessage("Fetch all Attendances with paginate")
  @Public()
  findAll(
    @Query("current") currentpage: string,
    @Query("pageSize") limit: string,
    @Query() qs:string
  ) {
    return this.attendancesService.findAll(+currentpage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch a Attendance by id")
  findOne(@Param('id') id: string) {
    return this.attendancesService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ResponseMessage("Update status Attendance")
  update(@Param('id') id: string,@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendancesService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @ResponseMessage("Delete a Attendance by id")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.attendancesService.remove(id,user);
  }
}
