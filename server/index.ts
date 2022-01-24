/* eslint-disable no-debugger */
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import userRouter from './src/routes/user'
import './src/config/mongo';

const app: express.Application = express();
const PORT: number = 5556;

app.use(
  cors({
    credentials: true,
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
