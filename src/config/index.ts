import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: __dirname + '/./../../.env.test' });
} else {
  dotenv.config({ path: __dirname + '/./../../.env' });
}

if (!process.env.DATABASE_URL) {
  throw new Error('missing environment variable "DATABASE_URL"');
}

if (!process.env.PORT) {
  throw new Error('missing environment variable "PORT"');
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
  NODE_ENV: process.env.PORT,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  OTP_SECRET: process.env.OTP_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};
