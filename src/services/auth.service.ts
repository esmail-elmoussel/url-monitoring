import { Dependencies } from '../types/container.types';

export class AuthService {
  private readonly userRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  findOrCreateUser = async (email: string) => {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.userRepository.create({ email });

    return newUser;
  };
}
