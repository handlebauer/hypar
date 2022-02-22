import Corestore from 'corestore'
import Autobase from 'autobase'
import HyperBee from 'hyperbee'

import RAM from 'random-access-memory'

/**
 * @typedef {Object} DatabaseInterface
 * @prop {Corestore} Corestore
 * @prop {Autobase} Autobase
 * @prop {HyperBee} Hyperbee
 */

/**
 * @typedef {Object} Autobee
 * @prop {DatabaseInterface['Autobase']} base
 * @prop {DatabaseInterface['Hyperbee']} db
 */

export class Setup {
  /** @returns {Promise<Database>} */
  static async start() {
    const store = new Corestore(RAM)
    /**
     * Get cores ready:
     *  1. Main local core,
     *  2. Autobase linearized core
     */
    const local = store.get({ name: 'writer' })
    const view = store.get({ name: 'view-output' })

    await local.ready()

    /**
     * Autobase depends on the child's apply(); hyperbee depends on
     * autobase's view; it's easier when they share a scope but there's
     * gotta be a better way
     */
    const child = this
    class Autobee {
      constructor() {
        // @ts-expect-error
        this.base = new Autobase({
          inputs: [local],
          localInput: local,
          // outputs: [view],
          localOutput: view,
          unwrap: true,
          // @ts-expect-error
          apply: child._apply.bind(this),
        })

        this.db = new HyperBee(this.base.view, {
          extension: false,
          keyEncoding: 'utf-8',
          valueEncoding: 'utf-8',
        })
      }
    }

    return Reflect.construct(this, [store, ...Object.values(new Autobee())])
  }
}
