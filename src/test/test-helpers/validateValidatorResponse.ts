import { assert, expect } from 'chai';

interface IValidatorData {
  value: string;
  msg: string;
  param: string;
  location: string;
}

interface IBody {
  success: boolean;
  message: string;
  data: IValidatorData[];
}

interface IValidateValidatorResponse {
  body: IBody;
  /**
   * !!!! Expected error order is important.
   */
  expectedErrors: IValidatorData[];
}

export const validateValidatorResponse = ({ body, expectedErrors }: IValidateValidatorResponse) => {
  expect(body).to.be.an('object').that.has.all.keys('success', 'message', 'data');
  const { success, message, data } = body;

  assert.isFalse(success);
  expect(message).to.equal('Validation failed.');

  expect(data).to.be.an('array').that.has.lengthOf(expectedErrors.length);

  expectedErrors.forEach(({ value, msg, param, location }, i) => {
    expect(data[i]).has.all.keys('param', 'msg', 'value', 'location');

    expect(data[i]).to.eql({
      value,
      msg,
      param,
      location,
    });
  });
};
