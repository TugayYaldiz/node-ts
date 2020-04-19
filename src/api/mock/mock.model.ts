// this is MOCK model for structure!!
import { IUser } from '@models/user.model';
import { Document, model, Schema } from 'mongoose';

const mockSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ['Car Repair Service', 'Auto Maintenance', 'Tires', 'Service Warranty'],
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

interface IMockSchema extends Document {
  description: string;
  date: Date;
  category: string;
}

export interface IMock extends IMockSchema {
  creator: IUser['_id'];
}

export const Mock = model<IMock>('Mock', mockSchema);
