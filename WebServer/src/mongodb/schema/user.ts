import { Document, Schema, Model, model, ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import * as config from '../../utils/config';
import { UserType } from '@@@/user';
const ObjectId = Schema.Types.ObjectId;

export interface UserModel extends UserType.Model, Document {
  _id: any;
  createToken: () => string;
  token2info: (token: string) => UserType.Model;
}

export const UserSchema: Schema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  // email: {
  //     type: String,
  //     default: '',
  //     match: /^\w+@\w+$/,
  // },
  tel: {
    type: String,
    default: '',
    trim: true,
    minlength: 11,
  },
  pwd: {
    type: String,
    required: true,
    match: /^\w{6,}$/,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // info: {
  //     type: ObjectId,
  //     ref: 'Info',
  // },
});
UserSchema.pre<UserModel>('save', function (next) {
  if (this.isNew) {
    this.createdAt = new Date();
  }

  next();
});
UserSchema.methods.createToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      tel: this.tel,
      email: this.email,
      pwd: this.pwd,
    } as UserType.Jwt,
    config.secret,
    { expiresIn: '240h' },
  );
};
UserSchema.methods.token2info = function (token) {
  return jwt.decode(token);
};

export const User: Model<UserModel> = model<UserModel>(
  'users',
  UserSchema,
  'users',
);
