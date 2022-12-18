import Joi from 'joi';

const getParams = Joi.object({
  urlId: Joi.string().uuid().required(),
}).required();

export const reportDto = {
  getParams,
};
