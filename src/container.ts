// awilix has to be imported using require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');
import { config } from './config';
import { DatabaseLoader, ServerLoader } from './loaders';

const container = awilix.createContainer();

container.register({
  serverLoader: awilix.asClass(ServerLoader).singleton(),
  databaseLoader: awilix.asClass(DatabaseLoader).singleton(),
  config: awilix.asValue(config),
});

container.loadModules(
  ['models/**/*.ts', 'services/**/*.ts', 'repositories/**/*.ts'],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: awilix.Lifetime.SINGLETON,
      register: awilix.asClass,
    },
  }
);

export { container };
