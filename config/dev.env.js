var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MESSAGING_URL: '"ws://localhost:8000/chat-service"'
})
