import sequelize from 'sequelize';
import { config } from '../config';
import { AuthController, UrlController } from '../controllers';
import { DatabaseLoader, ServerLoader } from '../loaders';
import { PollRequestModel, UrlModel, UserModel } from '../models';
import {
  PollRequestRepository,
  UrlRepository,
  UserRepository,
} from '../repositories';
import { routes, authRoutes, urlRoutes } from '../routes';
import {
  AuthService,
  MailService,
  OtpService,
  PollRequestService,
  UrlService,
} from '../services';

export interface Dependencies {
  serverLoader: ServerLoader;
  databaseLoader: DatabaseLoader;
  config: typeof config;

  routes: typeof routes;
  authRoutes: typeof authRoutes;
  urlRoutes: typeof urlRoutes;

  authController: AuthController;
  urlController: UrlController;

  authService: AuthService;
  mailService: MailService;
  otpService: OtpService;
  urlService: UrlService;
  pollRequestService: PollRequestService;

  userRepository: UserRepository;
  urlRepository: UrlRepository;
  pollRequestRepository: PollRequestRepository;

  userModel: sequelize.ModelStatic<UserModel>;
  urlModel: sequelize.ModelStatic<UrlModel>;
  pollRequestModel: sequelize.ModelStatic<PollRequestModel>;
}
