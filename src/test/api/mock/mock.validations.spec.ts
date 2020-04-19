import app from '@server';
import { validateValidatorResponse } from '@test-helpers';
import request from 'supertest';

describe('Mock Rest API Request Validations', () => {
  describe('/api/mock [GET]', () => {
    it("should fail on undefined 'id'", async () => {
      const queries = { id: undefined };

      const { body } = await request(app)
        .get('/api/mock')
        .query({ ...queries })
        .expect(400);

      validateValidatorResponse({
        body,
        expectedErrors: [
          {
            value: '',
            msg: 'required',
            param: 'id',
            location: 'query',
          },
        ],
      });
    });
  });
});
