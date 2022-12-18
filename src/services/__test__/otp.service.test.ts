import { OtpService } from '../otp.service';

const otpService = new OtpService();

const email = 'test@test.com';

describe('Otp Service', () => {
  it('Should create otpHash and code', async () => {
    const { otpCode, otpHash } = await otpService.createOtpHash(email);

    expect(otpCode).toBeDefined();
    expect(otpCode.length).toBe(4);

    expect(otpHash).toBeDefined();
  });

  it('Should throw error due to wrong code', async () => {
    const { otpHash } = await otpService.createOtpHash(email);

    let error;
    try {
      await otpService.verifyOtp(email, '1234', otpHash);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  it('Should throw error due to wrong email', async () => {
    const { otpCode, otpHash } = await otpService.createOtpHash(email);

    let error;
    try {
      await otpService.verifyOtp('somewrongemail@test.com', otpCode, otpHash);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  it('Should verify otp', async () => {
    const { otpCode, otpHash } = await otpService.createOtpHash(email);

    let error;
    try {
      await otpService.verifyOtp(email, otpCode, otpHash);
    } catch (err) {
      error = err;
    }

    expect(error).not.toBeDefined();
  });
});
