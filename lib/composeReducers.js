'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = composeReducers;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeReducers() {
    // eslint-disable-next-line
    var reducers = Array.from(arguments);

    return reducers.reduce(function (previousReducer, currentReducer) {
        return (
            // true to indicate that this function is composed,
            // so reducers created by createGeneralReducer will not create new state for each and everybody,
            // only first one, provided by composeReducers will
            function (state, action) {
                return currentReducer(previousReducer(state, action, true), action, true);
            }
        );
    }, function (state) {
        return (0, _lodash2.default)(state);
    });
}