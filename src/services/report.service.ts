import { NotFoundError } from '../errors';
import { PollRequestModel } from '../models';
import { Dependencies } from '../types/container.types';
import { PollRequestAttributes } from '../types/poll-request.types';
import { Report } from '../types/report.types';
import { sequelize } from '../utils';

export class ReportService {
  private readonly urlRepository;

  constructor({ urlRepository }: Dependencies) {
    this.urlRepository = urlRepository;
  }

  get = async (urlId: string, userId: string) => {
    const url = await this.urlRepository.findOne({
      where: { id: urlId, userId },
      include: [
        {
          model: PollRequestModel,
          as: 'pollRequests',
          attributes: [],
        },
      ],
    });

    if (!url) {
      throw new NotFoundError();
    }

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

    const totalCount =
      Number(result.up_status_count) + Number(result.down_status_count);

    const availabilityPercentage =
      (Number(result.up_status_count) / totalCount) * 100;

    const report: Report = {
      status: url.toJSON().status,
      availability: availabilityPercentage,
      outages: Number(result.down_status_count),
      downtime: Number(result.down_status_count) * url.toJSON().interval,
      uptime: Number(result.up_status_count) * url.toJSON().interval,
      responseTime: Number(result.response_time_average),
      history: url.toJSON().pollRequests as PollRequestAttributes[],
    };

    return report;
  };
}
