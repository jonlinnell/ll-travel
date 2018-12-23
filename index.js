#!/usr/bin/env node
/* eslint-disable no-console */

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const http = require('http')
const https = require('https')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')

const DEFAULT_PORT = 3000

require('dotenv').config({ path: path.resolve(`${__dirname}/.env`) })

const app = express()

const {
  ORIGIN,
  USE_TEST_DATA,
  NODE_ENV,
  PORT,
  KEY,
  CERT,
} = process.env

const stream = rfs(`logs/london-travel.log`, {
  size: '1M',
  interval: '1d',
  rotate: 31,
  compress: true,
})

app.use(bodyParser.json())

var corsOptions = {
  origin: ORIGIN || true
}

app.use(cors(corsOptions))

app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined', {
  stream: NODE_ENV === 'development' ? process.stdout : stream,
}))

fs.readdir(path.resolve('routes/'), (err, files) => {
  if (err) throw new Error(`Couldn\'t load routes: ${err}`)

  files.forEach(file => { require(path.resolve(`routes/${file}`))(app) })
})

if (USE_TEST_DATA) { console.log('Using test data. Unset USE_TEST_DATA to use live feeds.') }
if (NODE_ENV === 'development') { console.log('Starting in development mode.') }

const port = PORT || DEFAULT_PORT

if (NODE_ENV === 'production') {
  https.createServer({
    key: fs.readFileSync(KEY, 'utf8'),
    cert: fs.readFileSync(CERT, 'utf8'),
  }, app).listen(port)
} else {
  http.createServer(app).listen(port, () => console.log(`[dev] HTTP server listening on ${port}.`))
}
