import { getMockDA } from '@api/mock/mock.da';
import { assert, expect } from 'chai';

describe('Mock DA Functions', () => {
  describe('getMockDA', () => {
    it('should get given id', async () => {
      const queries = { id: 'John Doe' };

      const id = await getMockDA({ ...queries });

      assert.isString(id);
      expect(id).to.be.equal(queries.id);
    });
  });
});
