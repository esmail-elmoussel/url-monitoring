import sequelize from 'sequelize';
import { config } from '../config';
import {
  AuthController,
  ReportController,
  UrlController,
} from '../controllers';
import { PushoverIntegration } from '../integrations';
import { DatabaseLoader, AppLoader } from '../loaders';
import { PollRequestModel, UrlModel, UserModel } from '../models';
import {
  PollRequestRepository,
  UrlRepository,
  UserRepository,
} from '../repositories';
import { routes, authRoutes, urlRoutes, reportRoutes } from '../routes';
import {
  AuthService,
  CronService,
  MailService,
  NotificationService,
  OtpService,
  PollRequestService,
  ReportService,
  UrlService,
} from '../services';

export interface Dependencies {
  appLoader: AppLoader;
  databaseLoader: DatabaseLoader;
  config: typeof config;

  routes: typeof routes;
  authRoutes: typeof authRoutes;
  urlRoutes: typeof urlRoutes;
  reportRoutes: typeof reportRoutes;

  authController: AuthController;
  urlController: UrlController;
  reportController: ReportController;

  authService: AuthService;
  mailService: MailService;
  otpService: OtpService;
  urlService: UrlService;
  pollRequestService: PollRequestService;
  cronService: CronService;
  reportService: ReportService;
  notificationService: NotificationService;

  pushoverIntegration: PushoverIntegration;

  userRepository: UserRepository;
  urlRepository: UrlRepository;
  pollRequestRepository: PollRequestRepository;

  userModel: sequelize.ModelStatic<UserModel>;
  urlModel: sequelize.ModelStatic<UrlModel>;
  pollRequestModel: sequelize.ModelStatic<PollRequestModel>;
}
