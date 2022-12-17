import { UserModel } from '../models';
import { Dependencies } from '../types/container.types';
import { UserAttributes } from '../types/user.types';
import { BaseRepository } from './base.repository';

class UserRepository extends BaseRepository<UserModel, UserAttributes> {
  constructor({ userModel }: Dependencies) {
    super(userModel);
  }
}

export { UserRepository };
