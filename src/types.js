/** @typedef {import('express').Request} ExpressRequest */
/** @typedef {import('express').Response} ExpressResponse */
/** @typedef {import('express').NextFunction} ExpressNextFunction */

/** @typedef {[string, string]} TagEntry */
/** @typedef {string} Owner */
/** @typedef {string} TransactionID */

/** @typedef {import('./database/Database.js').Database} Database */
/** @typedef {import('./database/setup.js').DatabaseInterface['Corestore']} Corestore */
/** @typedef {import('./database/setup.js').DatabaseInterface['Autobase']} Autobase */
/** @typedef {import('./database/setup.js').DatabaseInterface['Hyperbee']} Hyperbee */
/** @typedef {import('./database/setup.js').Autobee} Autobee */

/**
 * @typedef {Object} OutputNode
 * @prop {string} header
 * @prop {string} id
 * @prop {number} seq
 * @prop {Buffer} change
 * @prop {Map<string,number>} clock
 * @prop {string} value
 * @prop {[number, number]} batch
 */

/**
 * @typedef {Object} SubmittedTransaction
 * @prop {TransactionID} id
 * @prop {TagEntry[]} tags
 * @prop {Owner} owner
 */
