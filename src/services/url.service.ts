import { NotFoundError } from '../errors';
import { UrlModel } from '../models';
import { Dependencies } from '../types/container.types';
import {
  Protocols,
  UrlAttributes,
  UrlCreationAttributes,
  UrlCreationDto,
  UrlStatuses,
} from '../types/url.types';

export class UrlService {
  private readonly urlRepository;
  private readonly cronService;
  private readonly pollRequestService;
  private readonly pollRequestRepository;

  constructor({
    urlRepository,
    cronService,
    pollRequestService,
    pollRequestRepository,
  }: Dependencies) {
    this.urlRepository = urlRepository;
    this.cronService = cronService;
    this.pollRequestService = pollRequestService;
    this.pollRequestRepository = pollRequestRepository;
  }

  private runPollRequestCronJob = (url: UrlAttributes) => {
    const cronString = this.cronService.convertSecondsToCron(url.interval);

    this.cronService.create(url.id, cronString, () => {
      console.log('RUNNING JOB FOR URL: ', url.baseUrl, 'WITH ID: ', url.id);
      this.pollRequestService.create(url.id);
    });
  };

  create = async (url: UrlCreationDto, userId: string) => {
    const protocol = url.baseUrl.includes('https')
      ? Protocols.Https
      : url.baseUrl.includes('http')
      ? Protocols.Http
      : Protocols.Tcp;

    const urlToBeCreated: UrlCreationAttributes = {
      ...url,
      userId,
      status: UrlStatuses.Up, // default status that gets updated after the url is created
      protocol,
    };

    const createdUrl = await this.urlRepository.create(urlToBeCreated);

    const urlId = createdUrl.toJSON().id;

    this.runPollRequestCronJob(createdUrl.toJSON());

    await this.pollRequestService.create(urlId);

    const updatedUrl = await this.urlRepository.findById(urlId);

    return updatedUrl;
  };

  edit = async ({
    urlDto,
    urlId,
    userId,
  }: {
    urlDto: Partial<UrlCreationDto>;
    urlId: string;
    userId: string;
  }) => {
    const existingUrl = await this.urlRepository.findOne({
      where: { id: urlId, userId },
    });

    if (!existingUrl) {
      throw new NotFoundError();
    }

    await this.urlRepository.update(urlDto, {
      where: { id: urlId },
    });

    this.cronService.cancel(urlId);

    const updatedUrl = (await this.urlRepository.findById(urlId)) as UrlModel;

    this.runPollRequestCronJob(updatedUrl.toJSON());
  };

  delete = async ({ urlId, userId }: { urlId: string; userId: string }) => {
    const existingUrl = await this.urlRepository.findOne({
      where: { id: urlId, userId },
    });

    if (!existingUrl) {
      throw new NotFoundError();
    }

    this.cronService.cancel(existingUrl.toJSON().id);

    await this.pollRequestRepository.delete({ where: { urlId } });

    await this.urlRepository.delete({ where: { id: urlId } });
  };

  findUserUrls = async (userId: string) => {
    const urls = await this.urlRepository.find({
      where: { userId },
    });

    return urls;
  };

  runJobsForAllExistingUrls = async () => {
    const urls = await this.urlRepository.find({});

    urls.map((url) => {
      this.runPollRequestCronJob(url.toJSON());
    });
  };
}
