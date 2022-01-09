
import * as Y from 'yjs' // eslint-disable-line
import * as encoding from 'lib0/encoding'
import * as decoding from 'lib0/decoding'

export const messagePermissionDenied = 0
export const messagePermissionApproved = 1
export const messagePermissionRequested = 2

/**
 * @param {encoding.Encoder} encoder
 * @param {string} reason
 */
export const writePermissionDenied = (encoder, reason) => {
  encoding.writeVarUint(encoder, messagePermissionDenied)
  encoding.writeVarString(encoder, reason)
}

/**
 * @param {encoding.Encoder} encoder
 * @param {string} status // string or string encoded json status
 */
export const writePermissionApproved = (encoder, status) => {
  encoding.writeVarUint(encoder, messagePermissionApproved)
  encoding.writeVarString(encoder, status)
}

/**
 * @param {encoding.Encoder} encoder
 * @param {string} token // string or string encoded json token
 */
export const writePermissionRequested = (encoder, token) => {
  encoding.writeVarUint(encoder, messagePermissionRequested)
  encoding.writeVarString(encoder, token)
}

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
export const readAuthMessage = (decoder, y, permissionDeniedHandler, permissionApprovedHandler) => {
  switch (decoding.readVarUint(decoder)) {
    case messagePermissionDenied: permissionDeniedHandler(y, decoding.readVarString(decoder))
    case messagePermissionApproved: permissionApprovedHandler(y, decoding.readVarString(decoder))
  }
}

/**
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} y
 * @param {PermissionRequestedHandler} permissionRequestedHandler
 */
 export const verifyAuthMessage = (decoder, y, permissionRequestedHandler) => {
  switch (decoding.readVarUint(decoder)) {
    case messagePermissionRequested: return permissionRequestedHandler(y, decoding.readVarString(decoder))
  }
}


