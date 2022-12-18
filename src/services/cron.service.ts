import { CronJob } from 'cron';

export class CronService {
  private cronJobs: { [key: string]: CronJob };

  constructor() {
    this.cronJobs = {};
  }

  create = (key: string, cronTime: string, onTick: () => void) => {
    const job = new CronJob(cronTime, onTick, null, true, 'Africa/Cairo');

    if (this.cronJobs[key]) {
      this.cancel(key);
    }

    this.cronJobs[key] = job;
  };

  cancel = (key: string) => {
    const job = this.cronJobs[key];

    if (job) {
      job.stop();

      delete this.cronJobs[key];
    }
  };

  convertSecondsToCron = (seconds: number) => {
    if (seconds < 60) {
      return `*/${Math.floor(seconds)} * * * * *`;
    }

    const minutes = seconds / 60;
    if (minutes < 60) {
      return `0 */${Math.floor(minutes)} * * * *`;
    }

    const hours = minutes / 60;
    if (hours < 24) {
      return `0 0 */${Math.floor(hours)} * * *`;
    }

    throw new Error('Not supported!');
  };
}
