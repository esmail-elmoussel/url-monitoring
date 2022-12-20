/* eslint-disable @typescript-eslint/ban-ts-comment */
import { baseRepositoryMock } from '../../repositories/__mocks__/base.repository.mock';
import { UrlStatuses } from '../../types/url.types';
import { ReportService } from '../report.service';

const urlRepository = { ...baseRepositoryMock };
const pollRequestRepository = { ...baseRepositoryMock, getReport: jest.fn() };

const pollRequestService = new ReportService({
  // @ts-ignore
  urlRepository,
  // @ts-ignore
  pollRequestRepository,
});

const url = {
  id: '02207106-45bf-4f64-83fa-856291099fae',
  userId: '32b95ef5-7f42-43c7-a6a5-999f1fb1379e',
  status: 'up',
  name: 'GOOGLE',
  baseUrl: 'https://www.google.com/',
  protocol: 'https',
  path: null,
  port: null,
  webhookUrl: null,
  timeout: 5,
  interval: 1000,
  threshold: 1,
  failureCount: 0,
  ignoreSSL: null,
  createdAt: '2022-12-18T22:17:49.368Z',
  updatedAt: '2022-12-18T22:17:49.368Z',
};

describe('Poll Request Service', () => {
  it('Should throw an error due to url not found', async () => {
    let error;
    try {
      await pollRequestService.get(url.id, url.userId);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  it('Should get report successfully', async () => {
    const responseTimeAverage = 288;
    const upStatusCount = 8;
    const downStatusCount = 2;

    urlRepository.findOne.mockReturnValue(url);
    pollRequestRepository.getReport.mockReturnValue({
      responseTimeAverage,
      upStatusCount,
      downStatusCount,
      totalCount: upStatusCount + downStatusCount,
    });

    const report = await pollRequestService.get(url.id, url.userId);

    expect(report.status).toBe(UrlStatuses.Up);
    expect(report.availability).toBe(80);
    expect(report.outages).toBe(2);
    expect(report.downtime).toBe(2 * url.interval);
    expect(report.uptime).toBe(8 * url.interval);
    expect(report.responseTime).toBe(288);
  });
});
