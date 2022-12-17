import { Request, Response } from 'express';
import { otpEmailTemplate } from '../templates/otp-email.template';
import { Dependencies } from '../types/container.types';

export class AuthController {
  private readonly service;
  private readonly mailService;
  private readonly otpService;
  private readonly jwtService;

  constructor({
    authService,
    mailService,
    otpService,
    jwtService,
  }: Dependencies) {
    this.service = authService;
    this.mailService = mailService;
    this.otpService = otpService;
    this.jwtService = jwtService;
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
    const { email, otpHash, code } = req.body as {
      email: string;
      otpHash: string;
      code: string;
    };

    await this.otpService.verifyOtp(email, code, otpHash);

    const user = await this.service.findOrCreateUser(email);

    const token = this.jwtService.generateToken(user.toJSON().id);

    return res.json({ user, token });
  };
}
