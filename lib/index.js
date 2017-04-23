'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGeneralReducer = exports.composeReducers = undefined;

var _composeReducers = require('./composeReducers');

var _composeReducers2 = _interopRequireDefault(_composeReducers);

var _createGeneralReducer = require('./createGeneralReducer');

var _createGeneralReducer2 = _interopRequireDefault(_createGeneralReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.composeReducers = _composeReducers2.default;
exports.createGeneralReducer = _createGeneralReducer2.default;