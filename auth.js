
import * as Y from 'yjs' // eslint-disable-line
import * as encoding from 'lib0/encoding'
import * as decoding from 'lib0/decoding'

export const messagePermissionDenied = 0
export const messagePermissionApproved = 1

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
 * @param {string} reason
 */
 export const writePermissionApproved = (encoder, reason) => {
  encoding.writeVarUint(encoder, messagePermissionApproved)
  encoding.writeVarString(encoder, reason)
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
