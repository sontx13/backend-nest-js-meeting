import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schema';
import { Job } from 'src/jobs/schemas/job.schemas';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({timestamps: true })
export class Attendance {
  @Prop()
  name: string;

  @Prop()
  access_token: string;

  @Prop()
  code: string;
  
  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  isActive: boolean;

  @Prop()
  timestamp: string;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: Company.name})
  companyId: mongoose.Schema.Types.ObjectId;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: Job.name})
  jobId: mongoose.Schema.Types.ObjectId;

  @Prop({type:Object})
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({type:Object})
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({type:Object})
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  isDeleted: boolean;

}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);