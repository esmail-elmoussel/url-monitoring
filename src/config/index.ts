import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_CONNECTION_STRING) {
  throw new Error('missing environment variable "DATABASE_CONNECTION_STRING"');
}

export const config = {
  PORT: 3000,
  DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
};
