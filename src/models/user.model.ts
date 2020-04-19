// this is MOCK model for structure!!
import { IMock } from '@api/mock/mock.model';
import { Document, model, Schema, Types } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  },
);

interface IUserSchema extends Document {
  email: string;
  password: string;
  name: string;
  surname: string;
  active?: boolean;
}

// Virtuals
/* istanbul ignore next */
userSchema.virtual('fullName').get(function (this: IUserSchema) {
  return `${this.name} ${this.surname}`;
});

interface IUserBase extends IUserSchema {
  fullName: string;
}

export interface IUser extends IUserBase {
  appointments: Types.Array<IMock['_id']>;
}

export const User = model<IUser>('User', userSchema);
