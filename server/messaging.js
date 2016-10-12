
const ChatService = require('chat-service')
const transport = require('chat-service-ws-messaging')

const port = 8000
const options = { port, transport }

function onConnect (service, id) {
  let { auth } = service.transport.getHandshakeData(id)
  if (!auth || !auth.user) {
    return Promise.reject(new Error('No login data.'))
  } else {
    return Promise.resolve(auth.user)
  }
}

const chat = new ChatService(options, {onConnect})

function cleanup () {
  chat.close().finally(() => process.exit())
}

process.on('SIGINT', cleanup)

chat.addRoom('Main', { adminlist: ['admin'], owner: 'admin' }).catchReturn()

chat.on('ready', () => console.log(`Messaging server: listening on port ${port}`))
