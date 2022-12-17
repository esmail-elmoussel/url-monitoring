import jwt from 'jsonwebtoken';
import { config } from '../config';

export class JwtService {
  generateToken = (id: string) => jwt.sign({ id }, config.JWT_SECRET);

  decodeToken = (token: string) => jwt.verify(token, config.JWT_SECRET);
}
