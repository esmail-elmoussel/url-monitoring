import { NotFoundError } from '../errors';
import { PollRequestModel } from '../models';
import { Dependencies } from '../types/container.types';
import { PollRequestAttributes } from '../types/poll-request.types';
import { Report } from '../types/report.types';

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
        },
      ],
    });

    if (!url) {
      throw new NotFoundError();
    }

    const result = await this.urlRepository.getReport(urlId);

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
