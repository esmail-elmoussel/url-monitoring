import { CronService } from '../cron.service';

const cronService = new CronService();

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe('Cron Service', () => {
  it('Should call cron function', async () => {
    const cronFunction = jest.fn();

    cronService.create('someKey', '* * * * * *', cronFunction);

    await sleep(1000);

    expect(cronFunction).toBeCalled();
  });

  it('Should cancel cron', async () => {
    const cronFunction = jest.fn();

    const cronKey = 'sasakjdhkjsa';

    cronService.create(cronKey, '* * * * * *', cronFunction);

    cronService.cancel(cronKey);

    await sleep(1000);

    expect(cronFunction).not.toBeCalled();
  });

  it('Should convert seconds to cron', async () => {
    const cronExpression = cronService.convertSecondsToCron(55);

    expect(cronExpression).toBe('*/55 * * * * *');
  });

  it('Should convert minutes to cron', async () => {
    const cronExpression = cronService.convertSecondsToCron(5 * 60);

    expect(cronExpression).toBe('0 */5 * * * *');
  });

  it('Should convert hours to cron', async () => {
    const cronExpression = cronService.convertSecondsToCron(5 * 60 * 60);

    expect(cronExpression).toBe('0 0 */5 * * *');
  });

  it('Should parse floats', async () => {
    const cronExpression = cronService.convertSecondsToCron(1000);

    expect(cronExpression).toBe('0 */16 * * * *');
  });
});
