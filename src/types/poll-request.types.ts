import { Optional } from 'sequelize';
import { UrlStatuses } from './url.types';

export type PollRequestAttributes = {
  id: string;
  urlId: string;
  status: UrlStatuses;
  responseTime: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PollRequestCreationAttributes = Optional<
  PollRequestAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface RequestWithPollRequestAttributes
  extends PollRequestAttributes,
    Request {}
