import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vote } from 'src/votes/schemas/vote.schema';

export type ResultDocument = HydratedDocument<Result>;

@Schema({timestamps: true })
export class Result {
  @Prop()
  answer: string;

  @Prop()
  phone: string;

  @Prop()
  token: string;

  @Prop()
  access_token: string;

  @Prop()
  name: string;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref: Vote.name})
  voteId: mongoose.Schema.Types.ObjectId;

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

export const ResultSchema = SchemaFactory.createForClass(Result);