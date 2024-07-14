import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import * as mongoose from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({
  //   discriminatorKey: 'role.userType',
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
})
export class Course {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  classroom: string;

  @Prop({
    type: {
      dayOfWeek: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      _id: false,
    },
  })
  courseSchedule: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Instructor' })
  instructor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'StudentClass' })
  studentClasses: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
