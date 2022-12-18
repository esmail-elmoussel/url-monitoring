import { PollRequestAttributes } from './poll-request.types';
import { UrlStatuses } from './url.types';

export type Report = {
  status: UrlStatuses;
  availability: number;
  outages: number;
  downtime: number;
  uptime: number;
  responseTime: number;
  history: PollRequestAttributes[];
};
