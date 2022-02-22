import test from 'ava'
import fetch from 'node-fetch'
import { buildURL } from '@hbauer/convenience-functions'

import { seed } from '../test/setup.js'

await seed()

test('Should return relevant IDs when supplied with tags', async t => {
  const { href } = buildURL({ host: 'http://localhost:8080', path: 'search' })
  const body = { tags: [['Version', '0.1.0']] }
  const init = {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  }
  // @ts-expect-error
  const { ids } = await fetch(href, init).then(res => res.json())

  t.true(ids.includes('12345') && ids.includes('67890'))
})

test('Should return relevant IDs when supplied with an owner', async t => {
  const { href } = buildURL({ host: 'http://localhost:8080', path: 'search' })
  const body = { owner: 'Donald' }
  const init = {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  }
  // @ts-expect-error
  const { ids } = await fetch(href, init).then(res => res.json())

  t.true(ids.includes('12345'))
})
