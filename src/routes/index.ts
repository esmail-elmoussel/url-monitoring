import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { Dependencies } from '../types/container.types';

export const routes = ({ authRoutes, urlRoutes }: Dependencies) => {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use(express.json()).use(cors());

  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/urls', urlRoutes);

  router.use('/v1/api', apiRouter);

  return router;
};

export * from './auth.routes';
export * from './url.routes';
