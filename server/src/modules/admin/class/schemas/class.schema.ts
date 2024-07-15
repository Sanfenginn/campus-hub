import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Student' }],
  })
  students: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Course' }],
  })
  courses: Types.ObjectId[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
