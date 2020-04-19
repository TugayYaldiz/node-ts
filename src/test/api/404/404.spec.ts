import app from '@server';
import request from 'supertest';

import { validateGenericError } from '@test-helpers';

describe('404 Not Handled APIs', () => {
  describe('/not-handled-route', () => {
    it('should return 404 for not handled route', async () => {
      const { body } = await request(app).get('/not-handled-route').expect(404);

      validateGenericError({ body, expectedMessage: 'Route not found' });
    });
  });
});
