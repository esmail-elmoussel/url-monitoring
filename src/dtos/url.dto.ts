import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  baseUrl: Joi.string().uri().required(),
  path: Joi.string(),
  port: Joi.number(),
  webhookUrl: Joi.string(),
  timeout: Joi.number().integer().min(1),
  interval: Joi.number().min(5).max(3600),
  threshold: Joi.number(),
  ignoreSSL: Joi.boolean(),
  authentication: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  httpHeaders: Joi.object(),
  assert: Joi.object({
    statusCode: Joi.number().required(),
  }),
}).required();

const edit = Joi.object({
  name: Joi.string(),
  baseUrl: Joi.string().uri(),
  path: Joi.string(),
  port: Joi.number(),
  webhookUrl: Joi.string(),
  timeout: Joi.number().integer().min(1),
  interval: Joi.number().min(5).max(3600),
  threshold: Joi.number(),
  ignoreSSL: Joi.boolean(),
  authentication: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
  httpHeaders: Joi.object(),
  assert: Joi.object({
    statusCode: Joi.number().required(),
  }),
}).required();

const params = Joi.object({
  id: Joi.string().uuid().required(),
}).required();

export const urlDto = {
  create,
  edit,
  params,
};
