import { Request, Response } from 'express';
import { Dependencies } from '../types/container.types';
import { UrlCreationDto } from '../types/url.types';

export class UrlController {
  urlService;

  constructor({ urlService }: Dependencies) {
    this.urlService = urlService;
  }

  create = async (req: Request, res: Response) => {
    const urlDto = req.body as UrlCreationDto;

    const { currentUser } = req;

    const userId = currentUser!.id;

    const url = await this.urlService.create(urlDto, userId);

    return res.json(url);
  };

  edit = async (req: Request, res: Response) => {
    const { id: urlId } = req.params;
    const urlDto = req.body as Partial<UrlCreationDto>;

    const userId = req.currentUser!.id;

    await this.urlService.edit({ urlDto, urlId, userId });

    return res.end();
  };

  delete = async (req: Request, res: Response) => {
    const { id: urlId } = req.params;

    const userId = req.currentUser!.id;

    await this.urlService.delete({ urlId, userId });

    return res.end();
  };

  findUserUrls = async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;

    const urls = await this.urlService.findUserUrls(userId);

    return res.json(urls);
  };
}
