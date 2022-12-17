import Joi from 'joi';

const sendOtp = Joi.object({
  email: Joi.string().email().required(),
}).required();

const verifyOtp = Joi.object({
  email: Joi.string().email().required(),
  otpHash: Joi.string().required(),
  code: Joi.number().required(),
}).required();

export const authDto = {
  sendOtp,
  verifyOtp,
};
