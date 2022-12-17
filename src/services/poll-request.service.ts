import { Dependencies } from '../types/container.types';
import { UrlStatuses } from '../types/url.types';
import { PollRequestCreationAttributes } from '../types/poll-request.types';
import { axios } from '../utils/axios.util';
import { NotFoundError } from '../errors';
import { urlStatusEmailTemplate } from '../templates';
import { UserModel } from '../models';
import { UserAttributes } from '../types/user.types';

export class PollRequestService {
  private readonly pollRequestRepository;
  private readonly urlRepository;
  private readonly mailService;

  constructor({
    pollRequestRepository,
    urlRepository,
    mailService,
  }: Dependencies) {
    this.pollRequestRepository = pollRequestRepository;
    this.urlRepository = urlRepository;
    this.mailService = mailService;
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

    const newPollRequest: PollRequestCreationAttributes = await axios
      .get(currentUrl.toJSON().baseUrl, {
        timeout: currentUrl.toJSON().timeout * 1000,
      })
      .then(async (response) => {
        /**
         * - if old status = down
         *    1. update status to up
         *    2. update failureCount to be 0
         *    3. send an email that url is up again
         */

        if (currentUrl.toJSON().status === UrlStatuses.Down) {
          await this.urlRepository.update(
            { status: UrlStatuses.Up, failureCount: 0 },
            { where: { id: urlId } }
          );

          console.log('SENDING EMAIL THAT URL IS UP...');

          this.mailService.send({
            to: (currentUrl.toJSON().user as UserAttributes).email,
            subject: 'Your URL is UP again',
            html: urlStatusEmailTemplate({
              ...currentUrl.toJSON(),
              status: UrlStatuses.Up,
              failureCount: 0,
            }),
          });
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

        const newFailureCount = currentUrl.toJSON().failureCount + 1;

        await this.urlRepository.update(
          { status: UrlStatuses.Down, failureCount: newFailureCount },
          { where: { id: urlId } }
        );

        if (newFailureCount === currentUrl.toJSON().threshold) {
          console.log('SENDING EMAIL THAT URL IS DOWN...');

          await this.mailService.send({
            to: (currentUrl.toJSON().user as UserAttributes).email,
            subject: 'Your URL is DOWN',
            html: urlStatusEmailTemplate({
              ...currentUrl.toJSON(),
              status: UrlStatuses.Down,
              failureCount: newFailureCount,
            }),
          });
        }

        const responseTime = error.duration;

        return {
          urlId,
          status: UrlStatuses.Down,
          responseTime,
        };
      });

    return await this.pollRequestRepository.create(newPollRequest);
  };
}