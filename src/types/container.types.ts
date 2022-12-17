import sequelize from 'sequelize';
import { config } from '../config';
import { AuthController } from '../controllers';
import { DatabaseLoader, ServerLoader } from '../loaders';
import { UserModel } from '../models';
import { UserRepository } from '../repositories';
import { routes, authRoutes } from '../routes';
import { AuthService, JwtService, MailService, OtpService } from '../services';

export interface Dependencies {
  serverLoader: ServerLoader;
  databaseLoader: DatabaseLoader;
  config: typeof config;

  routes: typeof routes;
  authRoutes: typeof authRoutes;

  authController: AuthController;

  authService: AuthService;
  mailService: MailService;
  otpService: OtpService;
  jwtService: JwtService;

  userRepository: UserRepository;

  userModel: sequelize.ModelStatic<UserModel>;
}
