import { UrlModel } from '../models';
import { Dependencies } from '../types/container.types';
import { UrlAttributes } from '../types/url.types';
import { BaseRepository } from './base.repository';

export class UrlRepository extends BaseRepository<UrlModel, UrlAttributes> {
  constructor({ urlModel }: Dependencies) {
    super(urlModel);
  }
}
