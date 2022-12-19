// this package written in JS! no @types/pushover-notifications package exists
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Push from 'pushover-notifications';
import { config } from '../config';
import { PushoverMessage } from '../types/pushover.types';

export class PushoverIntegration {
  private readonly pushover;

  constructor() {
    this.pushover = new Push({
      token: config.PUSHOVER_TOKEN,
    });
  }

  send = (msg: PushoverMessage) => {
    this.pushover.send(msg, function (err: Error) {
      if (err) {
        console.error(
          'Could not send pushover message due to:',
          JSON.stringify(err)
        );

        throw err;
      }
    });
  };
}
