// import { assert } from 'chai';
import { config } from '@conf';
import app from '@server';
import request from 'supertest';

import { validateGenericError } from '@test-helpers';

describe('Cors [CONFIG]', () => {
  it('should let request', async () => {
    const { body } = await request(app).get('/not-handled-route').expect(404);

    validateGenericError({ body, expectedMessage: 'Route not found' });
  });

  it('should not let request for not allowed origin', async () => {
    const RANDOM_ORIGIN = `https://${Math.random()}.random`;

    const { body } = await request(app)
      .post('/api/room/create-room')
      .set('Origin', RANDOM_ORIGIN)
      .expect(500);

    validateGenericError({
      body,
      expectedMessage: `The CORS policy for this site does not allow access from the ${RANDOM_ORIGIN} Origin.`,
    });
  });

  it('should let request for app base url', async () => {
    const { appBaseUrl } = config;

    const { body } = await request(app)
      .post('/not-handled-route')
      .set('Origin', appBaseUrl)
      .expect(404);

    validateGenericError({ body, expectedMessage: 'Route not found' });
  });

  it('should let request for all allowed origins', async () => {
    const { originWhitelist } = config;

    for (const origin of originWhitelist) {
      const { body } = await request(app)
        .post('/not-handled-route')
        .set('Origin', origin)
        .expect(404);

      validateGenericError({ body, expectedMessage: 'Route not found' });
    }
  });
});
