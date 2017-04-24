import cloneDeep from 'lodash.clonedeep';

export default function createGeneralReducer(
  actionInvocationPredicate = true,
  // eslint-disable-next-line
  stateProcessorPredicate = (newState, action) => newState,
  actionProcessorPredicate = action => action
) {
  const shouldActionInvocationPredicateBeInvoked = typeof actionInvocationPredicate === 'function';

  // eslint-disable-next-line
  return function generalReducer(state, action, __reducio__composed = false) {
    let reducerTriggered = false;

    if(shouldActionInvocationPredicateBeInvoked)
      reducerTriggered = actionInvocationPredicate(action);
    else
      reducerTriggered = !!actionInvocationPredicate;

    if(reducerTriggered) {
      let newState;
      // if this reducer is part of composed chain,
      // then we have no need to worry about cloning state,
      // since composeReducers does it for us

      // eslint-disable-next-line
      if(!__reducio__composed)
        newState = cloneDeep(state);
      else
        newState = state;
      const processedAction = actionProcessorPredicate(cloneDeep(action));
      return stateProcessorPredicate(newState, processedAction);
    }
    return state;
  };
}
