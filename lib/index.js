'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = exports.composeReducers = undefined;

var _composeReducers = require('./composeReducers');

var _composeReducers2 = _interopRequireDefault(_composeReducers);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.composeReducers = _composeReducers2.default;
exports.createReducer = _createReducer2.default;