import { IGenericErrorThrow, throwGenericError } from '@helpers';
import { expect } from 'chai';

describe('throwGenericError [HELPER]', () => {
  it('should throw generic error with status code: default (400)', () => {
    const payload = {
      message: 'Generic error',
    } as IGenericErrorThrow;

    try {
      throwGenericError({ ...payload });
    } catch (error) {
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal(payload.message);
    }
  });

  it('should throw generic error with status code: 500', () => {
    const payload = {
      message: 'Generic error',
      statusCode: 500,
    } as IGenericErrorThrow;

    try {
      throwGenericError({
        ...payload,
      });
    } catch (error) {
      expect(error.statusCode).to.be.equal(payload.statusCode);
      expect(error.message).to.be.equal(payload.message);
    }
  });

  it('should throw generic error with validation error data', () => {
    const payload = {
      message: 'Generic error',
      statusCode: 500,
      data: [
        {
          value: '',
          msg: 'required',
          location: 'body',
          param: 'room',
        },
      ],
    } as IGenericErrorThrow;

    try {
      throwGenericError({
        ...payload,
      });
    } catch (error) {
      expect(error.statusCode).to.be.equal(payload.statusCode);
      expect(error.message).to.be.equal(payload.message);
      expect(error.data).to.be.an('array').that.has.lengthOf(1);

      (error.data as IGenericErrorThrow['data'])!.forEach((error) => {
        expect(error).has.all.keys('param', 'msg', 'value', 'location');

        const { value, msg, param, location } = payload.data![0];
        expect(error).to.eql({
          value,
          msg,
          param,
          location,
        });
      });
    }
  });
});
