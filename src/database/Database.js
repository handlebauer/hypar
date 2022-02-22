import { Setup } from './setup.js'
import { Tags } from './Tags.js'
import { Owners } from './Owners.js'
import { Transaction } from './Transaction.js'

/** @implements {Setup} */
export class Database extends Setup {
  /**
   * @param {Corestore} store
   * @param {Autobase} base
   * @param {Hyperbee} db
   */
  constructor(store, base, db) {
    super()

    this.store = store
    this.base = base
    this.db = db

    this.tags = new Tags(base, db)
    this.owners = new Owners(base, db)
    this.transaction = new Transaction(base, db)
  }

  /**
   * Define the `apply` handler: this uses a hyperbee batch instance to
   * write keys/values to the underlying linearized view
   */
  /**
   * @this {Autobee}
   * @param {OutputNode[]} nodes
   */
  static async _apply(nodes) {
    const batch = this.db.batch({ update: false })

    for (const node of nodes) {
      /** @type {SubmittedTransaction} */
      const transaction = JSON.parse(node.value)

      // Keys
      for (let tagEntry of transaction.tags) {
        const key = 'tags!' + tagEntry.join('')
        const ids = (await batch.get(key))?.value?.split('\0')
        if (ids?.includes(transaction.id)) continue
        const value = (ids ? ids + '\0' : '') + transaction.id
        await batch.put(key, value)
      }

      // Owner
      const key = 'owners!' + transaction.owner
      const ids = (await batch.get(key))?.value?.split('\0')
      if (ids?.includes(transaction.id)) continue
      const value = (ids ? ids + '\0' : '') + transaction.id
      await batch.put(key, value)
    }

    await batch.flush()
  }
}
