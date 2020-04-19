import { isValidated } from '@middleware';
import { assert, expect } from 'chai';
import { Response } from 'express';
import { mockRequest } from 'mock-req-res';
import { spy } from 'sinon';

const req = mockRequest;

describe('isValidated [Middleware]', () => {
  describe('type validation', () => {
    it('should return function', async () => {
      expect(isValidated).to.be.a('function');
    });

    it('should accept three arguments', async () => {
      expect(isValidated.length).to.equal(3);
    });
  });

  describe('calling middleware', () => {
    it('should call next() once for valid payload', () => {
      const nextSpy = spy();

      isValidated(
        req({
          body: {
            key: 'valid',
          },
        }),
        {} as Response,
        nextSpy,
      );

      assert.isTrue(nextSpy.calledOnce);
    });
  });
});
