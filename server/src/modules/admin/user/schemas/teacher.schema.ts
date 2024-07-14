import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop({
    type: {
      firstName: { type: String },
      lastName: { type: String },
    },
    _id: false,
  })
  name: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Course', _id: false }])
  courses: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'StudentClass', _id: false }])
  studentClasses: Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
