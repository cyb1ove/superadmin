import { Document, FilterQuery, Model } from 'mongoose';
import { ServerUser } from '../../../common';

export interface IUserDocument extends ServerUser, Document {
  data: string;
}

export type UpdateUserDocument = FilterQuery<IUserDocument>

export interface IUserModel extends Model<IUserDocument> {
  createUser: (userData: ServerUser) => Promise<IUserDocument>;
  getUsers(): Promise<IUserDocument[]>;
  getUserByName(name: string): Promise<IUserDocument>;
  updateUser(name: string, update: UpdateUserDocument): Promise<IUserDocument>;
  deleteUser(name: string): Promise<void>;
  deleteAllUsers(): Promise<void>;
}
