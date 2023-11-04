import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schema';
import { Job } from 'src/jobs/schemas/job.schemas';

export type VoteDocument = HydratedDocument<Vote>;

@Schema({timestamps: true })
export class Vote {
  @Prop()
  question: string;

  @Prop()
  status: string;

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

export const VoteSchema = SchemaFactory.createForClass(Vote);