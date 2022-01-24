import { Request, Response } from 'express';
import UserModel from './../models/user';
import { isUser, isPartialUser } from '../utils/validation';

export default {
  onCreateUser: async (request: Request, response: Response): Promise<Response> => {
    if (!isUser(request.body)) {
      return response.status(500).json({ success: false, error: 'Not valid data' });
    }

    try {
      const userData = request.body;
      const user = await UserModel.createUser(userData);

      return response.status(200).json({ success: true, user });
    } catch (error) {
      return response.status(500).json({ success: false, error });
    }
  },
  onGetAllUsers: async (request: Request, response: Response): Promise<Response> => {
    try {
      const users = await UserModel.getUsers();

      return response.status(200).json({ success: true, users });
    } catch (error) {
      return response.status(500).json({ success: false, error });
    }
  },
  onGetUserByName: async (request: Request, response: Response): Promise<Response> => {
    try {
      const userName = request.params.user;
      const user = await UserModel.getUserByName(userName);

      if (user) {
        return response.status(200).json({ success: true, user });
      }

      return response.status(400).json({ success: false });
    } catch (error) {
      return response.status(500).json({ success: false, error });
    }
  },
  onUpdateUser: async (request: Request, response: Response): Promise<Response> => {
    if (!isPartialUser(request.body)) {
      return response.status(500).json({ success: false });
    }

    try {
      const userName = request.params.user;
      const update = request.body;
      const user = await UserModel.updateUser(userName, update);

      return response.status(200).json({ success: true, user });
    } catch (error) {
      return response.status(500).json({ success: false, error });
    }
  },
  onDeleteUser: async (request: Request, response: Response): Promise<Response> => {
    try {
      const userName = request.params.user;
      await UserModel.deleteUser(userName);

      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(500).json({ success: false, error });
    }
  },
  onDeleteAllUsers: async (request: Request, response: Response): Promise<Response> => {
    try {
      await UserModel.deleteAllUsers();

      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(500).json({ success: false, error });
    }
  },
};
