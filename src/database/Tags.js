export class Tags {
  /**
   * @param {Autobase} base
   * @param {Hyperbee} db
   */
  constructor(base, db) {
    this.base = base
    this.db = db
  }

  /**
   * @param {TagEntry} tagEntry
   * @param {TransactionID} id
   */
  async add(tagEntry, id) {
    await this.base.append(
      JSON.stringify({ type: 'tag', tag: tagEntry.join(''), id })
    )
  }

  /**
   * @param {TagEntry[]} tags
   * @returns {Promise<TransactionID[]>}
   */
  findMany(tags) {
    return Promise.all(tags.map(this.find.bind(this))).then(ids =>
      ids.flat().filter(Boolean)
    )
  }

  /**
   * @param {TagEntry} tag
   * @returns {Promise<TransactionID[]>}
   */
  find(tag) {
    return this.db
      .get('tags!' + tag.join(''))
      .then(ids => ids?.value.toString().split('\0'))
  }

  async *all() {
    const query = { gt: 'tags!', lt: 'tags!~' }
    for await (const data of this.db.createReadStream(query)) {
      yield data
    }
  }
}
