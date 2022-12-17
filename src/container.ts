// awilix has to be imported using require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');
import { AuthController, UrlController } from './controllers';
import { DatabaseLoader, ServerLoader } from './loaders';
import { PollRequestModel, UrlModel, UserModel } from './models';
import {
  PollRequestRepository,
  UrlRepository,
  UserRepository,
} from './repositories';
import { routes, authRoutes, urlRoutes } from './routes';
import { AuthService, MailService, OtpService, UrlService } from './services';

const container = awilix.createContainer();

container.register({
  serverLoader: awilix.asClass(ServerLoader).singleton(),
  databaseLoader: awilix.asClass(DatabaseLoader).singleton(),
});

container.register({
  routes: awilix.asFunction(routes).singleton(),
  authRoutes: awilix.asFunction(authRoutes).singleton(),
  urlRoutes: awilix.asFunction(urlRoutes).singleton(),
});

container.register({
  authController: awilix.asClass(AuthController).singleton(),
  urlController: awilix.asClass(UrlController).singleton(),
});

container.register({
  authService: awilix.asClass(AuthService).singleton(),
  mailService: awilix.asClass(MailService).singleton(),
  otpService: awilix.asClass(OtpService).singleton(),
  urlService: awilix.asClass(UrlService).singleton(),
});

container.register({
  userRepository: awilix.asClass(UserRepository).singleton(),
  urlRepository: awilix.asClass(UrlRepository).singleton(),
  pollRequestRepository: awilix.asClass(PollRequestRepository).singleton(),
});

container.register({
  userModel: awilix.asValue(UserModel),
  urlModel: awilix.asValue(UrlModel),
  pollRequestModel: awilix.asValue(PollRequestModel),
});

export { container };
