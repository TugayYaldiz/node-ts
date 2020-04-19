import { stringify } from '@helpers';
import { assert, expect } from 'chai';

describe('stringify [HELPER]', () => {
  it('should get stringified value', () => {
    const body = {
      stringifyTest: true,
    };

    const value = stringify(body);

    assert.isString(value);
    expect(value).to.include('stringifyTest');
  });

  it('should get stringified value from JSON that has circular references', () => {
    const circular = [{}];
    // @ts-ignore
    circular[0].circular = circular;
    circular.push(circular);

    const value = stringify(circular);

    assert.isString(value);
    expect(value).to.include('circular');
  });
});
