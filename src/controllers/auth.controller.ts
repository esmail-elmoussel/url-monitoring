import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { otpEmailTemplate } from '../templates/otp-email.template';
import { Dependencies } from '../types/container.types';

export class AuthController {
  private readonly service;
  private readonly mailService;
  private readonly otpService;

  constructor({ authService, mailService, otpService }: Dependencies) {
    this.service = authService;
    this.mailService = mailService;
    this.otpService = otpService;
  }

  sendOtp = async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };

    const { otpCode, otpHash } = await this.otpService.createOtpHash(email);

    await this.mailService.send({
      to: email,
      subject: 'OTP verification code',
      html: otpEmailTemplate(otpCode),
    });

    return res.json({ otpHash });
  };

  verifyOtp = async (req: Request, res: Response) => {
    const { email, otpHash, code, pushoverId } = req.body as {
      email: string;
      otpHash: string;
      code: string;
      pushoverId?: string;
    };

    await this.otpService.verifyOtp(email, code, otpHash);

    const user = await this.service.findOrCreateUser(email, pushoverId);

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET);

    return res.json({ user, token });
  };
}
