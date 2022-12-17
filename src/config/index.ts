import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('missing environment variable "DATABASE_URL"');
}

if (!process.env.EMAIL) {
  throw new Error('missing environment variable "EMAIL"');
}

if (!process.env.EMAIL_PASSWORD) {
  throw new Error('missing environment variable "EMAIL_PASSWORD"');
}

if (!process.env.OTP_SECRET) {
  throw new Error('missing environment variable "OTP_SECRET"');
}

if (!process.env.JWT_SECRET) {
  throw new Error('missing environment variable "JWT_SECRET"');
}

export const config = {
  PORT: 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  OTP_SECRET: process.env.OTP_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};
