import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  baseUrl: Joi.string().uri().required(),
  path: Joi.string(),
  port: Joi.number(),
  webhookUrl: Joi.string(),
  timeout: Joi.number(),
  interval: Joi.number(),
  threshold: Joi.number(),
  ignoreSSL: Joi.boolean(),
}).required();

const params = Joi.object({
  id: Joi.string().uuid().required(),
}).required();

export const urlDto = {
  create,
  params,
};
