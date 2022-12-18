/* eslint-disable @typescript-eslint/ban-ts-comment */
import { baseRepositoryMock } from '../../repositories/__mocks__/base.repository.mock';
import { PollRequestService } from '../poll-request.service';
import { mailServiceMock } from '../__mocks__/mail.service.mock';

const mailService = mailServiceMock;
const pollRequestRepository = { ...baseRepositoryMock };
const urlRepository = { ...baseRepositoryMock };

const pollRequestService = new PollRequestService({
  // @ts-ignore
  mailService,
  // @ts-ignore
  pollRequestRepository,
  // @ts-ignore
  urlRepository,
});

const brokenUrl = 'https://www.gooasdjhggle.com/asdsad';
const url = {
  id: '2a161d6f-02b0-46ea-8394-9be4ee4126b2',
  userId: '32b95ef5-7f42-43c7-a6a5-999f1fb1379e',
  status: 'up',
  name: 'GOOGLE',
  baseUrl: 'https://www.google.com/',
  protocol: 'https',
  path: null,
  port: null,
  webhookUrl: null,
  timeout: 5,
  interval: 1000,
  threshold: 1,
  failureCount: 0,
  ignoreSSL: null,
  createdAt: '2022-12-18T22:26:37.529Z',
  updatedAt: '2022-12-18T22:26:37.529Z',
  user: {
    id: '32b95ef5-7f42-43c7-a6a5-999f1fb1379e',
    email: 'elmoussel12@gmail.com',
    createdAt: '2022-12-17T22:54:30.116Z',
    updatedAt: '2022-12-17T22:54:30.116Z',
  },
};

describe('Poll Request Service', () => {
  it('Should fail due to url not found', async () => {
    let error;
    try {
      const data = await pollRequestService.create(url.id);
      expect(data).not.toBeDefined();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  it('Should not update url due to status was up and stayed as up', async () => {
    urlRepository.findById.mockReturnValue({ toJSON: () => url });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).not.toBeCalled();
  });

  it('Should update url due to status was down and became up', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => ({ ...url, status: 'down' }),
    });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).toBeCalledTimes(1);
  });

  it('Should update url due to status was up and became down', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => ({
        ...url,
        baseUrl: brokenUrl,
      }),
    });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).toBeCalledTimes(1);
  });

  it('Should update url when status was down and stayed down to update failureCount', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => ({
        ...url,
        status: 'down',
        baseUrl: brokenUrl,
      }),
    });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).toBeCalledTimes(1);
  });

  it('Should send email that status is up again', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => ({ ...url, status: 'down' }),
    });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).toBeCalledTimes(1);
    expect(mailService.send).toBeCalledTimes(1);

    expect(mailService.send).toBeCalledWith(
      expect.objectContaining({
        to: url.user.email,
        subject: 'Your URL is UP again',
      })
    );
  });

  it('Should send email that status is down', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => ({ ...url, baseUrl: brokenUrl }),
    });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).toBeCalledTimes(1);
    expect(mailService.send).toBeCalledTimes(1);

    expect(mailService.send).toBeCalledWith(
      expect.objectContaining({
        to: url.user.email,
        subject: 'Your URL is DOWN',
      })
    );
  });

  it('Should not send email although of url is down due to threshold', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => ({ ...url, baseUrl: brokenUrl, threshold: 2 }),
    });

    await pollRequestService.create(url.id);

    expect(urlRepository.update).toBeCalledTimes(1);
    expect(mailService.send).not.toBeCalled();
  });

  it('Should create poll request record', async () => {
    urlRepository.findById.mockReturnValue({
      toJSON: () => url,
    });

    await pollRequestService.create(url.id);

    expect(pollRequestRepository.create).toBeCalledTimes(1);
  });
});
