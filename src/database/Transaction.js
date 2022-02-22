export class Transaction {
  /**
   * @param {Autobase} base
   * @param {Hyperbee} db
   */
  constructor(base, db) {
    this.base = base
    this.db = db
  }

  /**
   * @param {string} transaction
   */
  async add(transaction) {
    await this.base.append(transaction)
  }
}
