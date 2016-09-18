
const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')

const app = express()

const root = path.join(__dirname, '../dist/')
const port = 8080

const options = { root }

app.use(history())
app.use(express.static(root))

app.get('/', function (req, res) {
  res.sendFile('index.html', options)
})

app.listen(port, function () {
  require('./messaging')
  console.log(`Content server: listening on port ${port}`)
})
