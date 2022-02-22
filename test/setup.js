import fetch from 'node-fetch'
import { buildURL } from '@hbauer/convenience-functions'

export const seed = async () => {
  const { href } = buildURL({ host: 'http://localhost:8080', path: 'tx' })

  const bodyA = {
    transaction: {
      id: '12345',
      tags: [['Version', '0.1.0']],
      owner: 'Donald',
    },
  }
  const bodyB = {
    transaction: { id: '67890', tags: [['Version', '0.1.0']], owner: 'Rolf' },
  }

  await Promise.all(
    [bodyA, bodyB].map(async body => {
      const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
      await fetch(href, init)
    })
  )
}
