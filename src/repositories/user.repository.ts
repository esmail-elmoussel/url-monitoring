import { UserModel } from '../models';
import { Dependencies } from '../types/container.types';
import { BaseRepository } from './base.repository';

class UserRepository extends BaseRepository<UserModel> {
  constructor({ userModel }: Dependencies) {
    super(userModel);
  }
}

export { UserRepository };
