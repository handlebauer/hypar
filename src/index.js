import { server } from './server.js'
import { LISTEN_PORT } from './constants.js'

server.listen(LISTEN_PORT, () => console.log(`Listening on: ${LISTEN_PORT}`))
