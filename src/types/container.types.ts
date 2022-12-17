import sequelize from 'sequelize';
import { config } from '../config';
import { AuthController, UrlController } from '../controllers';
import { DatabaseLoader, ServerLoader } from '../loaders';
import { UrlModel, UserModel } from '../models';
import { UrlRepository, UserRepository } from '../repositories';
import { routes, authRoutes, urlRoutes } from '../routes';
import { AuthService, MailService, OtpService, UrlService } from '../services';

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

  userRepository: UserRepository;
  urlRepository: UrlRepository;

  userModel: sequelize.ModelStatic<UserModel>;
  urlModel: sequelize.ModelStatic<UrlModel>;
}
