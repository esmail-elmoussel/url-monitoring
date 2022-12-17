import { NotFoundError } from '../errors';
import { Dependencies } from '../types/container.types';
import {
  Protocols,
  UrlCreationAttributes,
  UrlCreationDto,
  UrlStatuses,
} from '../types/url.types';

export class UrlService {
  private readonly urlRepository;

  constructor({ urlRepository }: Dependencies) {
    this.urlRepository = urlRepository;
  }

  create = async (url: UrlCreationDto, userId: string) => {
    const protocol = url.baseUrl.includes('https')
      ? Protocols.Https
      : url.baseUrl.includes('http')
      ? Protocols.Http
      : Protocols.Tcp;

    const urlToBeCreated: UrlCreationAttributes = {
      ...url,
      userId,
      status: UrlStatuses.Up,
      protocol,
    };

    const createdUrl = await this.urlRepository.create(urlToBeCreated);

    return createdUrl;
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
  };

  delete = async ({ urlId, userId }: { urlId: string; userId: string }) => {
    const existingUrl = await this.urlRepository.findOne({
      where: { id: urlId, userId },
    });

    if (!existingUrl) {
      throw new NotFoundError();
    }

    await this.urlRepository.delete({ where: { id: urlId } });
  };

  findAll = async (userId: string) => {
    const urls = await this.urlRepository.find({
      where: { userId },
    });

    return urls;
  };
}
