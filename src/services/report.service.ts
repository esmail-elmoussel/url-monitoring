import { NotFoundError } from '../errors';
import { PollRequestModel } from '../models';
import { Dependencies } from '../types/container.types';
import { PollRequestAttributes } from '../types/poll-request.types';
import { Report } from '../types/report.types';

export class ReportService {
  private readonly urlRepository;
  private readonly pollRequestRepository;

  constructor({ urlRepository, pollRequestRepository }: Dependencies) {
    this.urlRepository = urlRepository;
    this.pollRequestRepository = pollRequestRepository;
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

    const result = await this.pollRequestRepository.getReport(urlId);

    const availabilityPercentage =
      (result.upStatusCount / result.totalCount) * 100;

    const report: Report = {
      status: url.status,
      availability: availabilityPercentage,
      outages: result.downStatusCount,
      downtime: result.downStatusCount * url.interval,
      uptime: result.upStatusCount * url.interval,
      responseTime: result.responseTimeAverage,
      history: url.pollRequests as PollRequestAttributes[],
    };

    return report;
  };
}
