import bcryptjs from 'bcryptjs';
import { config } from '../config';
import { BadRequestError } from '../errors';

export class OtpService {
  createOtpHash = async (email: string) => {
    const otpCode = Math.floor(Math.random() * 8999 + 1000); // generate 4 digits code

    const expirationTime = Date.now() + 5 * 60 * 1000; // timestamp after 5 minutes

    // generate hashed (email + otp code)
    const verificationHash = await bcryptjs.hash(
      email + otpCode + config.OTP_SECRET,
      10
    );

    const otpHash = `${verificationHash}+${expirationTime}`;

    return {
      otpCode: otpCode.toString(),
      otpHash,
    };
  };

  verifyOtp = async (email: string, code: string, otpHash: string) => {
    const [verificationHash, expirationTime] = otpHash.split('+');

    if (Date.now() > parseInt(expirationTime, 10)) {
      throw new BadRequestError('Otp expired!');
    }

    // compare new hashed (email + otp code) with the same algorithm and keys
    const isOtpValid = await bcryptjs.compare(
      email + code + config.OTP_SECRET,
      verificationHash
    );

    if (!isOtpValid) {
      throw new BadRequestError('Invalid otp!');
    }
  };
}
