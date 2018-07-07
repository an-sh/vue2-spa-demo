
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

function startChatService () {
  const chat = new ChatService(options, {onConnect})

  chat.addRoom('Main', { adminlist: ['admin'], owner: 'admin' })
    .then(() => chat.execUserCommand(true, 'roomAddToList', 'Main', 'blacklist', ['badUser']))
    .catchReturn()

  chat.on('ready', () => console.log(`Messaging server: listening on port ${port}`))

  process.on('SIGINT', () => chat.close())
}

module.exports = {
  startChatService
}
