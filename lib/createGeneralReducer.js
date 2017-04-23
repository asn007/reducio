'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGeneralReducer;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var newState = void 0;

      // if this reducer is part of composed chain,
      // then we have no need to worry about cloning state,
      // since composeReducers does it for us

      // eslint-disable-next-line
      if (!__reducio__composed) newState = (0, _lodash2.default)(state);else newState = state;
      var processedAction = actionProcessorPredicate(action);

      return stateProcessorPredicate(newState, processedAction);
    }

    return state;
  };
}