// awilix has to be imported using require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const awilix = require('awilix');
import { AuthController, ReportController, UrlController } from './controllers';
import { PushoverIntegration } from './integrations';
import { DatabaseLoader, AppLoader } from './loaders';
import { PollRequestModel, UrlModel, UserModel } from './models';
import {
  PollRequestRepository,
  UrlRepository,
  UserRepository,
} from './repositories';
import { routes, authRoutes, urlRoutes, reportRoutes } from './routes';
import {
  AuthService,
  CronService,
  MailService,
  NotificationService,
  OtpService,
  PollRequestService,
  ReportService,
  UrlService,
} from './services';

const container = awilix.createContainer();

container.register({
  appLoader: awilix.asClass(AppLoader).singleton(),
  databaseLoader: awilix.asClass(DatabaseLoader).singleton(),
});

container.register({
  routes: awilix.asFunction(routes).singleton(),
  authRoutes: awilix.asFunction(authRoutes).singleton(),
  urlRoutes: awilix.asFunction(urlRoutes).singleton(),
  reportRoutes: awilix.asFunction(reportRoutes).singleton(),
});

container.register({
  authController: awilix.asClass(AuthController).singleton(),
  urlController: awilix.asClass(UrlController).singleton(),
  reportController: awilix.asClass(ReportController).singleton(),
});

container.register({
  authService: awilix.asClass(AuthService).singleton(),
  mailService: awilix.asClass(MailService).singleton(),
  otpService: awilix.asClass(OtpService).singleton(),
  urlService: awilix.asClass(UrlService).singleton(),
  pollRequestService: awilix.asClass(PollRequestService).singleton(),
  cronService: awilix.asClass(CronService).singleton(),
  reportService: awilix.asClass(ReportService).singleton(),
  notificationService: awilix.asClass(NotificationService).singleton(),
});

container.register({
  pushoverIntegration: awilix.asClass(PushoverIntegration).singleton(),
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
