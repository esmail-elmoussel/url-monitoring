import { urlStatusEmailTemplate } from '../templates';
import { Dependencies } from '../types/container.types';
import { UrlAttributes, UrlStatuses } from '../types/url.types';
import { UserAttributes } from '../types/user.types';

export class NotificationService {
  private readonly mailService;

  constructor({ mailService }: Dependencies) {
    this.mailService = mailService;
  }

  send = async (url: UrlAttributes) => {
    console.log(
      `SENDING EMAIL THAT URL ${url.baseUrl} WITH ID ${url.id} IS ${
        url.status === UrlStatuses.Up ? 'UP AGAIN!' : 'DOWN!'
      }`
    );

    this.mailService.send({
      to: (url.user as UserAttributes).email,
      subject: 'Your URL is UP again',
      html: urlStatusEmailTemplate(url),
    });

    // TODO: Add other integrations here...
  };
}
