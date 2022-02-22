export class Owners {
  /**
   * @param {Autobase} base
   * @param {Hyperbee} db
   */
  constructor(base, db) {
    this.base = base
    this.db = db
  }

  /**
   * @param {Owner} owner
   * @param {TransactionID} id
   */
  async add(owner, id) {
    await this.base.append(JSON.stringify({ type: 'owner', owner, id }))
  }

  /**
   * @param {Owner[]} owners
   * @returns {Promise<TransactionID[]>}
   */
  findMany(owners) {
    return Promise.all(owners.map(this.find.bind(this))).then(ids =>
      ids.flat().filter(Boolean)
    )
  }

  /**
   * @param {Owner} owner
   * @returns {Promise<TransactionID[]>}
   */
  find(owner) {
    return this.db
      .get('owners!' + owner)
      .then(ids => ids?.value.toString().split('\0'))
  }

  async *all() {
    const query = { gt: 'owners!', lt: 'owners!~' }
    for await (const data of this.db.createReadStream(query)) {
      yield data
    }
  }
}
