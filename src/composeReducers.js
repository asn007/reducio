import cloneDeep from 'lodash.clonedeep';

export default function composeReducers() {
  // eslint-disable-next-line
  const reducers = Array.from(arguments);

  return reducers.reduce(
    (previousReducer, currentReducer) => (
      // true to indicate that this function is composed,
      // so reducers created by createGeneralReducer will not create new state for each and everybody,
      // only first one, provided by composeReducers will
      (state, action) =>
        currentReducer(previousReducer(state, action, true), action, true)
    ),
    state => cloneDeep(state)
  );
}
