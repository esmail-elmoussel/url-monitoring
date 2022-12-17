import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { config } from '../config';

export class MailService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
  }

  send = async (options: Mail.Options) => {
    const body: Mail.Options = {
      from: 'URL Monitoring service',
      ...options,
    };

    try {
      return await this.transporter.sendMail(body);
    } catch (err) {
      console.error('Could not send email with body: ', JSON.stringify(body));

      throw err;
    }
  };
}
