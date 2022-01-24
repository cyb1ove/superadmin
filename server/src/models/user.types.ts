import { Document, FilterQuery, Model } from 'mongoose';

export interface User {
  name: string;
  email: string;
}

export interface IUserDocument extends User, Document {
  data?: number;
}

export type UpdateUserDocument = FilterQuery<IUserDocument>

export interface IUserModel extends Model<IUserDocument> {
  createUser: (userData: User) => Promise<string>;
  getUsers(): Promise<IUserDocument[]>;
  getUserByName(name: string): Promise<IUserDocument>;
  updateUser(name: string, update: UpdateUserDocument): Promise<IUserDocument>;
  deleteUser(name: string): Promise<void>;
  deleteAllUsers(): Promise<void>;
}
