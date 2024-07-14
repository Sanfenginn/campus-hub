import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
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

  @Prop({ type: Types.ObjectId, ref: 'StudentClass' })
  studentClass: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
