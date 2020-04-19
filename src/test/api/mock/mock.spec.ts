import app from '@server';
import { assert, expect } from 'chai';
import request from 'supertest';

describe('Mock Rest API', () => {
  describe('/api/mock [GET]', () => {
    it('should get given ID', async () => {
      const queries = { id: 'John Doe' };

      const { body } = await request(app)
        .get('/api/mock')
        .query({ ...queries })
        .expect(200);
      expect(body).to.be.an('object').that.has.all.keys('success', 'message', 'id');
      const { success, message, id } = body;

      assert.isTrue(success);
      assert.isString(id);
      expect(message).to.be.equal('ID found.');
      assert.isTrue(id.startsWith(queries.id));
    });
  });
});
