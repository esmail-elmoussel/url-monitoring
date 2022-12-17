/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof CustomError) {
    console.error(
      `${err.statusCode} - ${JSON.stringify(err.serializeErrors())} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );

    return res.status(err.statusCode).json(err.serializeErrors());
  }

  const status = 500;
  const message = 'Internal server error';

  console.error(
    `${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  console.error(err);

  return res.status(status).send({ message });
};

export default errorHandlerMiddleware;
