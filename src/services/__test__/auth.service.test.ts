/* eslint-disable @typescript-eslint/ban-ts-comment */

import { baseRepositoryMock } from '../../repositories/__mocks__/base.repository.mock';
import { AuthService } from '../auth.service';

const user = {
  id: '32b95ef5-7f42-43c7-a6a5-999f1fb1379e',
  email: 'test@test.com',
  createdAt: '2022-12-17T22:54:30.116Z',
  updatedAt: '2022-12-17T22:54:30.116Z',
};

const userRepository = baseRepositoryMock;

// @ts-ignore
const authService = new AuthService({ userRepository });

describe('Auth Service', () => {
  it('Should return user because it exists', async () => {
    userRepository.findOne.mockReturnValue(Promise.resolve(user));

    const data = await authService.findOrCreateUser(user.email);

    expect(data).toBe(user);
    expect(userRepository.findOne).toBeCalledTimes(1);
    expect(userRepository.create).not.toBeCalled();
  });

  it('Should create a new user and return it', async () => {
    userRepository.create.mockReturnValue(Promise.resolve(user));

    const data = await authService.findOrCreateUser(user.email);

    expect(data).toBe(user);
    expect(userRepository.create).toBeCalledTimes(1);
    expect(userRepository.findOne).toBeCalledTimes(1);
  });
});
