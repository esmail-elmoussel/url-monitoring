import Joi from 'joi';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private error: Joi.ValidationError) {
    super('Request validation error!');
  }

  serializeErrors() {
    return this.error.details.map((err) => {
      return {
        message: err.message.replace(/['"]/g, '').trim(),
        field: err.context?.key,
      };
    });
  }
}
