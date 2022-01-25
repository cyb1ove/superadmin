import { Schema, model } from 'mongoose';
import { IUserDocument, IUserModel, UpdateUserDocument } from './user.types';
import { ServerUser } from '../../../common';

export const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  data: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

userSchema.statics.createUser = async function (userData: ServerUser): Promise<IUserDocument> {
  const user: IUserDocument = await this.create(userData);

  return user;
};

userSchema.statics.getUsers = async function (): Promise<IUserDocument[]> {
  const users: IUserDocument[] = await this.find();

  return users;
};

userSchema.statics.getUserByName = async function (name: string): Promise<IUserDocument> {
  const user: IUserDocument = await this.findOne({ name });

  return user;
};

userSchema.statics.updateUser = async function (
  name: string,
  update: UpdateUserDocument,
): Promise<IUserDocument> {
  await this.findOneAndUpdate({ name }, update);
  const updatedUser = await this.findOne(update);

  return updatedUser;
};

userSchema.statics.deleteUser = async function (name: string): Promise<void> {
  await this.findOneAndRemove({ name });
};

userSchema.statics.deleteAllUsers = async function (): Promise<void> {
  await this.deleteMany({});
};

export default model<IUserDocument, IUserModel>('users_new', userSchema);
