'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGeneralReducer;
function createGeneralReducer() {
  var actionInvocationPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var stateProcessorPredicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (newState, action) {
    return newState;
  };
  var actionProcessorPredicate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (action) {
    return action;
  };

  var shouldActionInvocationPredicateBeInvoked = typeof actionInvocationPredicate === 'function';

  // eslint-disable-next-line
  return function generalReducer(state, action) {
    var __reducio__composed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var reducerTriggered = false;

    if (shouldActionInvocationPredicateBeInvoked) reducerTriggered = actionInvocationPredicate(action);else reducerTriggered = !!actionInvocationPredicate;

    if (reducerTriggered) {
      var processedAction = Object.assign({}, action, actionProcessorPredicate(action));

      return stateProcessorPredicate(state, processedAction, __reducio__composed);
    }

    return state;
  };
}