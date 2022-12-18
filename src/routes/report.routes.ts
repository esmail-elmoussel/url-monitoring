import { Router } from 'express';
import { reportDto } from '../dtos';
import { checkSchemaMiddleware } from '../middlewares';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { Dependencies } from '../types/container.types';

export function reportRoutes({ reportController }: Dependencies) {
  const router = Router();

  router.get(
    '/:urlId',
    authenticationMiddleware,
    checkSchemaMiddleware({
      schema: reportDto.getParams,
      source: 'params',
    }),
    reportController.get
  );

  return router;
}
