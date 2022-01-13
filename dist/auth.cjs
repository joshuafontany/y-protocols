'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('yjs');
var encoding = require('lib0/dist/encoding.cjs');
var decoding = require('lib0/dist/decoding.cjs');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var encoding__namespace = /*#__PURE__*/_interopNamespace(encoding);
var decoding__namespace = /*#__PURE__*/_interopNamespace(decoding);

const messagePermissionDenied = 0;
const messagePermissionApproved = 1;
const messagePermissionRequested = 2;

/**
 * @param {encoding.Encoder} encoder
 * @param {string} reason
 */
const writePermissionDenied = (encoder, reason) => {
  encoding__namespace.writeVarUint(encoder, messagePermissionDenied);
  encoding__namespace.writeVarString(encoder, reason);
};

/**
 * @param {encoding.Encoder} encoder
 * @param {string} status // string or string encoded json status
 */
const writePermissionApproved = (encoder, status) => {
  encoding__namespace.writeVarUint(encoder, messagePermissionApproved);
  encoding__namespace.writeVarString(encoder, status);
};

/**
 * @param {encoding.Encoder} encoder
 * @param {string} token // string or string encoded json token
 */
const writePermissionRequested = (encoder, token) => {
  encoding__namespace.writeVarUint(encoder, messagePermissionRequested);
  encoding__namespace.writeVarString(encoder, token);
};

/**
 * @callback PermissionDeniedHandler
 * @param {any} y
 * @param {string} reason
 */

/**
 * @callback PermissionApprovedHandler
 * @param {any} y
 * @param {string} reason
 */

/**
 * @callback PermissionRequestedHandler
 * @param {any} y
 * @param {WebSocket} conn
 * @param {string} token
 * @returns {boolean} // authorized, required
 */

/**
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} y
 * @param {PermissionDeniedHandler} permissionDeniedHandler
 * @param {PermissionApprovedHandler} permissionApprovedHandler
 */
const readAuthMessage = (decoder, y, permissionDeniedHandler, permissionApprovedHandler) => {
  switch (decoding__namespace.readVarUint(decoder)) {
    case messagePermissionDenied: permissionDeniedHandler(y, decoding__namespace.readVarString(decoder));
    case messagePermissionApproved: permissionApprovedHandler(y, decoding__namespace.readVarString(decoder));
  }
};

/**
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} y
 * @param {WebSocket} conn
 * @param {PermissionRequestedHandler} permissionRequestedHandler
 */
 const verifyAuthMessage = (decoder, y, conn, permissionRequestedHandler) => {
  switch (decoding__namespace.readVarUint(decoder)) {
    case messagePermissionRequested: permissionRequestedHandler(y, conn, decoding__namespace.readVarString(decoder));
  }
};

exports.messagePermissionApproved = messagePermissionApproved;
exports.messagePermissionDenied = messagePermissionDenied;
exports.messagePermissionRequested = messagePermissionRequested;
exports.readAuthMessage = readAuthMessage;
exports.verifyAuthMessage = verifyAuthMessage;
exports.writePermissionApproved = writePermissionApproved;
exports.writePermissionDenied = writePermissionDenied;
exports.writePermissionRequested = writePermissionRequested;
//# sourceMappingURL=auth.cjs.map
