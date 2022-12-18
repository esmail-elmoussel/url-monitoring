import request from 'supertest';
import { app } from '../../test/setup';

describe('Auth routes', () => {
  describe('Send OTP', () => {
    it('Should hit the end point successfully', async () => {
      const response = await request(app).post('/v1/api/auth/otp/send');

      expect(response.status).not.toBe(404);
    });

    describe('Request validation', () => {
      it('Should fail due to email not sent', async () => {
        const response = await request(app)
          .post('/v1/api/auth/otp/send')
          .expect(400);

        expect(response.body[0].field).toBe('email');
        expect(response.body[0].message).toBe('email is required');
      });

      it('Should fail due to invalid email', async () => {
        const response = await request(app)
          .post('/v1/api/auth/otp/send')
          .send({ email: 'asdsda@asda' })
          .expect(400);

        expect(response.body[0].field).toBe('email');
        expect(response.body[0].message).toBe('email must be a valid email');
      });
    });

    it('Should return otpHash', async () => {
      const response = await request(app)
        .post('/v1/api/auth/otp/send')
        .send({ email: 'mail@mail.com' })
        .expect(200);

      expect(response.body.otpHash).toBeDefined();
      expect(typeof response.body.otpHash).toBe('string');
    });
  });

  describe('Verify OTP', () => {
    it('Should hit the end point successfully', async () => {
      const response = await request(app).post('/v1/api/auth/otp/verify');

      expect(response.status).not.toBe(404);
    });

    describe('Request validation', () => {
      it('Should fail due to email not sent', async () => {
        const response = await request(app)
          .post('/v1/api/auth/otp/verify')
          .expect(400);

        expect(response.body[0].field).toBe('email');
      });

      it('Should fail due to invalid email', async () => {
        const response = await request(app)
          .post('/v1/api/auth/otp/verify')
          .send({ email: 'asdsda@asda' })
          .expect(400);

        expect(response.body[0].field).toBe('email');
      });

      it('Should fail otpHash not sent', async () => {
        const response = await request(app)
          .post('/v1/api/auth/otp/verify')
          .send({ email: 'test@test.com' })
          .expect(400);

        expect(response.body[0].field).toBe('otpHash');
      });

      it('Should fail code not sent', async () => {
        const response = await request(app)
          .post('/v1/api/auth/otp/verify')
          .send({ email: 'test@test.com', otpHash: 'askdjhaskjdhksajh' })
          .expect(400);

        expect(response.body[0].field).toBe('code');
      });
    });

    it('Should fail due to wrong OTP', async () => {
      const response = await request(app)
        .post('/v1/api/auth/otp/verify')
        .send({
          email: 'test@test.com',
          otpHash: 'askdjhaskjdhksajh',
          code: '1234',
        })
        .expect(400);

      expect(response.body[0].message).toBe('Invalid otp!');
    });
  });
});
