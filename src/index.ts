import { container } from './container';
import { DatabaseLoader, ServerLoader } from './loaders';

const serverLoader = container.resolve('serverLoader') as ServerLoader;
const databaseLoader = container.resolve('databaseLoader') as DatabaseLoader;

const start = async () => {
  await databaseLoader.connect();

  await serverLoader.start();
};

start();
