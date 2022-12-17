import { Router } from 'express';
import { authDto } from '../dtos';
import { checkSchemaMiddleware } from '../middlewares';
import { Dependencies } from '../types/container.types';

export function authRoutes({ authController }: Dependencies) {
  const router = Router();

  router.post(
    '/otp/send',
    checkSchemaMiddleware({
      schema: authDto.sendOtp,
      source: 'body',
    }),
    authController.sendOtp
  );

  router.post(
    '/otp/verify',
    checkSchemaMiddleware({
      schema: authDto.verifyOtp,
      source: 'body',
    }),
    authController.verifyOtp
  );

  return router;
}
