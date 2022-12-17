import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthenticationError } from '../errors/authentication-error';
import { DecodedToken } from '../types/user.types';

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers as { authorization?: string };

  if (!authorization) {
    throw new AuthenticationError('authorization header must be provided!');
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw new AuthenticationError('invalid token!');
  }

  jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      throw new AuthenticationError(err.message);
    }

    req.currentUser = decodedToken as DecodedToken;
    next();
  });
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: DecodedToken;
    }
  }
}
