/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { RequestValidationError } from '../errors';

const checkSchemaMiddleware = ({
  schema,
  source = 'body',
  options,
}: {
  schema: Joi.ObjectSchema<any>;
  source: string;
  options?: ValidationOptions;
}) => {
  // enabled HTTP methods for request data validation
  const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

  // return the validation middleware
  return (req: Request, res: Response, next: () => void) => {
    const method = req.method.toLowerCase();
    const checkSchema = supportedMethods.includes(method) && schema;
    if (!checkSchema) {
      return next();
    }

    let data;

    if (source === 'body') {
      data = req.body;
    } else if (source === 'params') {
      data = req.params;
    } else {
      data = req.headers;
    }

    const newOptions = {
      allowUnknown: false,
      abortEarly: false,
      ...options,
    };

    const { error, value } = schema.validate(data, newOptions);

    if (error) {
      throw new RequestValidationError(error);
    }

    if (source === 'body') {
      req.body = value;
    } else if (source === 'params') {
      req.params = value;
    } else {
      req.headers = value;
    }

    return next();
  };
};

export default checkSchemaMiddleware;
