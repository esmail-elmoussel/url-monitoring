import { container } from './container';
import { DatabaseLoader, AppLoader } from './loaders';
import { UrlService } from './services';

const appLoader = container.resolve('appLoader') as AppLoader;
const databaseLoader = container.resolve('databaseLoader') as DatabaseLoader;
const urlService = container.resolve('urlService') as UrlService;

export const startServer = async () => {
  await databaseLoader.connect();

  appLoader.listen();

  urlService.runJobsForAllExistingUrls();
};

startServer();
