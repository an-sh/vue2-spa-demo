
const ChatService = require('chat-service')

const port = 8000
const options = { port }

function onConnect (service, id) {
  let { query } = service.transport.getHandshakeData(id)
  if (!query.user) {
    return Promise.reject(new Error('No login data.'))
  } else {
    return Promise.resolve(query.user)
  }
}

const chat = new ChatService(options, {onConnect})

function cleanup () {
  chat.close().finally(() => process.exit())
}

process.on('SIGINT', cleanup)

chat.addRoom('Main', { adminlist: ['admin'], owner: 'admin' }).catchReturn()

chat.on('ready', () => console.log(`Messaging server: listening on port ${port}`))
