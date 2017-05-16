/* eslint-disable */
import chai from 'chai';
import createReducer from '../src/createReducer';


const assert = chai.assert;

describe('createReducer', () => {

  it('should return a function accepting two arguments', () => {
    assert.equal(createReducer().length, 2);
  });

  it('generated reducer should perform state modification', () => {
    const reducer = createReducer(true, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.equal(reducer(state, {copy: 'success'}, true).result, 'success');
  });

  it('generated reducer should only be invoked when specific predicate is true', () => {
    const reducer = createReducer(false, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.notEqual(reducer(state, {copy: 'success'}, true).result, 'success');
  });

  it('generated reducer should be invoked when specific predicate is function and returns true when called with action', () => {
    const reducer = createReducer(action => action.shouldInvoke, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.equal(reducer(state, {copy: 'success', shouldInvoke: true}, true).result, 'success');
  });

  it('generated reducer should not invoke when specific predicate is function and returns false', () => {
    const reducer = createReducer(action => action.shouldInvoke, (state, action) => {
      state['result'] = action.copy;
      return state;
    });
    const state = { key: 'test' };
    assert.notEqual(reducer(state, {copy: 'success', shouldInvoke: false}, true).result, 'success');
  });

  it('should accept action transformation predicate and transform action', () => {
    const reducer = createReducer(true, (state, action) => {
      state['result'] = action.copy;
      assert.equal(action.invalid, true);
      return state;
    }, action => Object.assign({}, action, { invalid: true }));
    const state = { key: 'test' };
    assert.equal(reducer(state, {copy: 'success', shouldInvoke: true}, true).result, 'success');
  });
});
