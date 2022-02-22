/**l
 * @param {ExpressRequest} req
 * @param {ExpressResponse} _
 * @param {ExpressNextFunction} done
 */
export function jsonQueryParser(req, _, done) {
  for (let key of Object.keys(req.query)) {
    /** @type {*} */
    const value = req.query[key]
    req.query[key] = JSON.parse(value)
  }
  done()
}
