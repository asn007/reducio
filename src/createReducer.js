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
      const processedAction = actionProcessorPredicate(cloneDeep(action));
      return stateProcessorPredicate(state, processedAction, __reducio__composed);
    }

    return state;
  };
}
