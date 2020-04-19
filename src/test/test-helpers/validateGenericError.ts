import { assert, expect } from 'chai';

interface IValidateGenericError {
  body: {
    success: boolean;
    message: string;
  };
  expectedMessage: string;
}

export const validateGenericError = ({ body, expectedMessage }: IValidateGenericError) => {
  expect(body).to.be.an('object').that.has.all.keys('success', 'message');
  const { success, message } = body;

  assert.isFalse(success);
  expect(message).to.be.equal(expectedMessage);
};
