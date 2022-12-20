/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dependencies } from '../types/container.types';
import { UrlStatuses } from '../types/url.types';
import { PollRequestCreationAttributes } from '../types/poll-request.types';
import { axios } from '../utils/axios.util';
import { NotFoundError } from '../errors';
import { UserModel } from '../models';
import { sequelize } from '../utils';

export class PollRequestService {
  private readonly pollRequestRepository;
  private readonly urlRepository;
  private readonly notificationService;

  constructor({
    pollRequestRepository,
    urlRepository,
    notificationService,
  }: Dependencies) {
    this.pollRequestRepository = pollRequestRepository;
    this.urlRepository = urlRepository;
    this.notificationService = notificationService;
  }

  create = async (urlId: string) => {
    const currentUrl = await this.urlRepository.findById(urlId, {
      include: [
        {
          model: UserModel,
          as: 'user',
        },
      ],
      rejectOnEmpty: true,
    });

    if (!currentUrl) {
      throw new NotFoundError();
    }

    const transaction = await sequelize.transaction();

    const urlPath = currentUrl.path
      ? currentUrl.baseUrl + currentUrl.path
      : currentUrl.baseUrl;

    const authenticationHeader = currentUrl.authentication || {};
    const requestHeaders = currentUrl.httpHeaders || {};

    const headers = { ...authenticationHeader, ...requestHeaders };

    try {
      const newPollRequest: PollRequestCreationAttributes = await axios
        .get(urlPath, {
          headers,
          timeout: currentUrl.timeout * 1000,
        })
        .then(async (response) => {
          /**
           * - if old status = down
           *    1. update status to up
           *    2. update failureCount to be 0
           *    3. send an email that url is up again
           */

          if (currentUrl.status === UrlStatuses.Down) {
            await this.urlRepository.update(
              { status: UrlStatuses.Up, failureCount: 0 },
              { where: { id: urlId }, transaction }
            );

            this.notificationService.send({
              ...currentUrl,
              status: UrlStatuses.Up,
              failureCount: 0,
            });
          }

          // @ts-ignore
          const responseTime = response.duration;

          return {
            urlId,
            status: UrlStatuses.Up,
            responseTime,
          };
        })
        .catch(async (error) => {
          /**
           * 1. update status to down
           * 2. update failureCount to failureCount + 1
           * - if new failureCount === threshold
           *   1. send an email that url is down
           */

          const newFailureCount = currentUrl.failureCount + 1;

          await this.urlRepository.update(
            { status: UrlStatuses.Down, failureCount: newFailureCount },
            { where: { id: urlId }, transaction }
          );

          if (newFailureCount === currentUrl.threshold) {
            this.notificationService.send({
              ...currentUrl,
              status: UrlStatuses.Down,
              failureCount: newFailureCount,
            });
          }

          const responseTime = error.duration;

          return {
            urlId,
            status: UrlStatuses.Down,
            responseTime,
          };
        });

      const pollRequest = await this.pollRequestRepository.create(
        newPollRequest,
        { transaction }
      );

      await transaction.commit();

      return pollRequest;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  };
}
