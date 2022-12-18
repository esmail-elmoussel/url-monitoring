import { UrlModel } from '../models';
import { Dependencies } from '../types/container.types';
import { UrlAttributes } from '../types/url.types';
import { sequelize } from '../utils';
import { BaseRepository } from './base.repository';

export class UrlRepository extends BaseRepository<UrlModel, UrlAttributes> {
  constructor({ urlModel }: Dependencies) {
    super(urlModel);
  }

  getReport = async (urlId: string) => {
    const [results] = await sequelize.query(
      `
        SELECT 
          AVG (poll_requests.response_time) AS response_time_average,
          COUNT (CASE WHEN poll_requests.status = 'up' THEN 1 ELSE NULL END) AS up_status_count,
          COUNT (CASE WHEN poll_requests.status = 'down' THEN 1 ELSE NULL END) AS down_status_count
        FROM urls LEFT JOIN poll_requests 
        ON urls.id = poll_requests.url_id 
        WHERE urls.id = '${urlId}'
      `
    );

    const result = results[0] as {
      response_time_average: string;
      up_status_count: string;
      down_status_count: string;
    };

    return result;
  };
}
