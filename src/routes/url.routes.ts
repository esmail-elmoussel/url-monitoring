import { Router } from 'express';
import { urlDto } from '../dtos';
import { checkSchemaMiddleware } from '../middlewares';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { Dependencies } from '../types/container.types';

export function urlRoutes({ urlController }: Dependencies) {
  const router = Router();

  router.post(
    '/',
    authenticationMiddleware,
    checkSchemaMiddleware({
      schema: urlDto.create,
      source: 'body',
    }),
    urlController.create
  );

  router.put(
    '/:id',
    authenticationMiddleware,
    checkSchemaMiddleware({
      schema: urlDto.params,
      source: 'params',
    }),
    checkSchemaMiddleware({
      schema: urlDto.edit,
      source: 'body',
    }),
    urlController.edit
  );

  router.delete(
    '/:id',
    authenticationMiddleware,
    checkSchemaMiddleware({
      schema: urlDto.params,
      source: 'params',
    }),

    urlController.delete
  );

  router.get('/', authenticationMiddleware, urlController.findAll);

  return router;
}
