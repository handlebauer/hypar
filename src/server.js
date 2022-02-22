import express from 'express'

import { Database } from './database/Database.js'

import { logIncomingRequest } from './middleware/log-incoming-request.js'

const server = express()
const db = await Database.start()

server.use(express.json())
server.use(logIncomingRequest())

server.post('/tx', async (req, res) => {
  const { transaction } = req.body
  await db.transaction.add(JSON.stringify(transaction))
  return res.status(202).json({ id: transaction.id })
})

server.post('/search', async (req, res) => {
  const data = {}
  if (req.body.tags) {
    data.ids = await db.tags.findMany(req.body.tags)
  }
  if (req.body.owner) {
    data.ids = await db.owners.find(req.body.owner)
  }
  res.json(data)
})

export { server }
