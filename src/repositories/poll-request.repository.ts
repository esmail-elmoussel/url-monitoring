import { PollRequestModel } from '../models/poll-request.model';
import { Dependencies } from '../types/container.types';
import { PollRequestAttributes } from '../types/poll-request.types';
import { sequelize } from '../utils';
import { BaseRepository } from './base.repository';

export class PollRequestRepository extends BaseRepository<
  PollRequestModel,
  PollRequestAttributes
> {
  constructor({ pollRequestModel }: Dependencies) {
    super(pollRequestModel);
  }

  getReport = async (urlId: string) => {
    const [results] = await sequelize.query(
      `
        SELECT 
        AVG (poll_requests.response_time) AS response_time_average,
        COUNT (CASE WHEN poll_requests.status = 'up' THEN 1 ELSE NULL END) AS up_status_count,
        COUNT (CASE WHEN poll_requests.status = 'down' THEN 1 ELSE NULL END) AS down_status_count
        FROM poll_requests
        WHERE poll_requests.url_id = '${urlId}'
      `
    );

    const result = results[0] as {
      response_time_average: string;
      up_status_count: string;
      down_status_count: string;
    };

    const responseTimeAverage = Number(result.response_time_average);
    const upStatusCount = Number(result.up_status_count);
    const downStatusCount = Number(result.down_status_count);
    const totalCount =
      Number(result.up_status_count) + Number(result.down_status_count);

    return {
      responseTimeAverage,
      upStatusCount,
      downStatusCount,
      totalCount,
    };
  };
}
