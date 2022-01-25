import express, { Router } from 'express';
import userRouter from '../controllers/userControler';

const router: Router = express.Router();

router
  .post('/', userRouter.onCreateUser)
  .get('/users', userRouter.onGetAllUsers)
  .delete('/users', userRouter.onDeleteAllUsers)
  .get('/:user', userRouter.onGetUserByName)
  .put('/:user', userRouter.onUpdateUser)
  .delete('/:user', userRouter.onDeleteUser);

export default router;
