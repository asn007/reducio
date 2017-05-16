/* eslint-disable */
import chai from 'chai';
import composeReducers from '../src/composeReducers';


const assert = chai.assert;

describe('composeReducers', () => {
  it('should perform left to right function composition', () => {
    assert.equal(composeReducers((state, action) => 'test', (state, action) => state + ' not test')('test', {}), 'test not test');
  });

  it('should pass third argument to every reducer as true', () => {
    composeReducers((state, action, third) => assert.equal(third, true))();
  });
});
