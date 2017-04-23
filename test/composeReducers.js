/* eslint-disable */

const chai = require('chai');

const assert = chai.assert;

import composeReducers from '../src/composeReducers';


describe('composeReducers', () => {
  it('should perform left to right function composition', () => {
    assert.equal(composeReducers((state, action) => 'test', (state, action) => state + ' not test')('test', {}), 'test not test');
  });

  it('should pass third argument to every reducer as true', () => {
    composeReducers((state, action, third) => assert.equal(third, true))();
  });

  it('should keep same state instance over reducers', () => {
    let st;
    composeReducers(
      state => {
        st = state;
        return state;
      },
      state => assert.equal(st, state)
    )({})
  })

});
