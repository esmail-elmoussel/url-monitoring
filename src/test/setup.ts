import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.test' });

import { container } from '../container';
import { DatabaseLoader, AppLoader } from '../loaders';
import { sequelize } from '../utils';

const appLoader = container.resolve('appLoader') as AppLoader;
const databaseLoader = container.resolve('databaseLoader') as DatabaseLoader;

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockReturnValue({ sendMail: jest.fn() }),
  };
});

beforeAll(async () => {
  await databaseLoader.connect();
});

afterEach(async () => {
  await sequelize.truncate({ cascade: true });

  jest.clearAllMocks();
  jest.resetAllMocks();
});

afterAll(async () => {
  await sequelize.close();
});

const app = appLoader.getApp();

export { app };
