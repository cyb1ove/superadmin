import { User, UpdateUserDocument } from './../models/user.types';
import { userSchema } from './../models/user'

export function isUser(data: any): data is User {
  return typeof data.name === 'string' && typeof data.email === 'string';
}

export function isPartialUser(data: any): data is UpdateUserDocument {
  const keysOfUserDocument = Object.keys(userSchema.paths);
  const keyUpdate = Object.keys(data)[0];

  return keysOfUserDocument.includes(keyUpdate);
}
