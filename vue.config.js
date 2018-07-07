const { startChatService } = require('./server/messaging.js')

module.exports = {
  devServer: {
    after: (app) => {
      startChatService()
    }
  }
}
