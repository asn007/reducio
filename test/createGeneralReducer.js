/* eslint-disable */

const chai = require('chai');

const assert = chai.assert;

import createGeneralReducer from '../src/createGeneralReducer';

describe('createGeneralReducer', () => {

  it('should return a function accepting two arguments', () => {
    assert.equal(createGeneralReducer().length, 2);
  });

  it('generated reducer should return a new copy of state', () => {
    const reducer = createGeneralReducer();
    const state = { key: 'test' };
    assert.notEqual(reducer(state, {}), state);
  });

  it('generated reducer should not clone state when third argument is set to true', () => {
    const reducer = createGeneralReducer();
    const state = { key: 'test' };
    assert.equal(reducer(state, {}, true), state);
  });

  it('generated reducer should perform state modification', () => {
    const reducer = createGeneralReducer(true, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.equal(reducer(state, {copy: 'success'}, true).result, 'success');
  });

  it('generated reducer should only be invoked when specific predicate is true', () => {
    const reducer = createGeneralReducer(false, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.notEqual(reducer(state, {copy: 'success'}, true).result, 'success');
  });

  it('generated reducer should be invoked when specific predicate is function and returns true when called with action', () => {
    const reducer = createGeneralReducer(action => action.shouldInvoke, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.equal(reducer(state, {copy: 'success', shouldInvoke: true}, true).result, 'success');
  });

  it('generated reducer should not invoke when specific predicate is function and returns false', () => {
    const reducer = createGeneralReducer(action => action.shouldInvoke, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.notEqual(reducer(state, {copy: 'success', shouldInvoke: false}, true).result, 'success');
  });

  it('should accept action transformation predicate and transform action', () => {
    const reducer = createGeneralReducer(true, (state, action) => {
      state['result'] = action.copy;
      assert.equal(action.invalid, true);
      return state;
    }, action => Object.assign({}, action, { invalid: true }));
    const state = { key: 'test' };
    assert.equal(reducer(state, {copy: 'success', shouldInvoke: true}, true).result, 'success');
  });
});
