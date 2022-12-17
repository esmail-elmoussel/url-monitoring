// awilix has to be imported using require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');
import { AuthController } from './controllers';
import { DatabaseLoader, ServerLoader } from './loaders';
import { UserModel } from './models';
import { UserRepository } from './repositories';
import { routes, authRoutes } from './routes';
import { AuthService, JwtService, MailService, OtpService } from './services';

const container = awilix.createContainer();

container.register({
  serverLoader: awilix.asClass(ServerLoader).singleton(),
  databaseLoader: awilix.asClass(DatabaseLoader).singleton(),
});

container.register({
  routes: awilix.asFunction(routes).singleton(),
  authRoutes: awilix.asFunction(authRoutes).singleton(),
});

container.register({
  authController: awilix.asClass(AuthController).singleton(),
});

container.register({
  authService: awilix.asClass(AuthService).singleton(),
  mailService: awilix.asClass(MailService).singleton(),
  otpService: awilix.asClass(OtpService).singleton(),
  jwtService: awilix.asClass(JwtService).singleton(),
});

container.register({
  userRepository: awilix.asClass(UserRepository).singleton(),
});

container.register({
  userModel: awilix.asValue(UserModel),
});

export { container };
