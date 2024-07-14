import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
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
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
