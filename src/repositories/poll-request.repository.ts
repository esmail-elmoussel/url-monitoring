import { PollRequestModel } from '../models/poll-request.model';
import { Dependencies } from '../types/container.types';
import { PollRequestAttributes } from '../types/poll-request.types';
import { BaseRepository } from './base.repository';

export class PollRequestRepository extends BaseRepository<
  PollRequestModel,
  PollRequestAttributes
> {
  constructor({ pollRequestModel }: Dependencies) {
    super(pollRequestModel);
  }
}
