import {
  urlStatusEmailTemplate,
  urlStatusPushoverTemplate,
} from '../templates';
import { Dependencies } from '../types/container.types';
import { UrlAttributes, UrlStatuses } from '../types/url.types';
import { UserAttributes } from '../types/user.types';

export class NotificationService {
  private readonly mailService;
  private readonly pushoverIntegration;

  constructor({ mailService, pushoverIntegration }: Dependencies) {
    this.mailService = mailService;
    this.pushoverIntegration = pushoverIntegration;
  }

  send = async (url: UrlAttributes) => {
    console.log(
      `SENDING NOTIFICATION THAT URL ${url.baseUrl} WITH ID ${url.id} IS ${
        url.status === UrlStatuses.Up ? 'UP AGAIN!' : 'DOWN!'
      }`
    );

    const user = url.user as UserAttributes;

    const title = `Your URL is ${
      url.status === UrlStatuses.Up ? 'UP again' : 'DOWN'
    }`;

    try {
      this.mailService.send({
        to: (url.user as UserAttributes).email,
        subject: title,
        html: urlStatusEmailTemplate(url),
      });

      if (user.pushoverId) {
        this.pushoverIntegration.send({
          user: user.pushoverId,
          title,
          message: urlStatusPushoverTemplate(url),
          html: 1,
        });
      }

      // TODO: Add other integrations here...
    } catch (err) {
      console.error('Error sending notification due to: ', JSON.stringify(err));
    }
  };
}
