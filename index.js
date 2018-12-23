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

const { resolve } = require('path')

const DEFAULT_PORT = 3000
const APP_NAME = 'london-travel'

require('dotenv').config({ path: resolve(`${__dirname}/.env`) })

const app = express()

const {
  ORIGIN,
  USE_TEST_DATA,
  NODE_ENV,
  PORT,
  KEY,
  CERT,
} = process.env

const stream = rfs(`logs/${APP_NAME}.log`, {
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

require('./routes')(app)

if (USE_TEST_DATA) { console.log('Using test data. Unset USE_TEST_DATA to use live feeds.') }
if (NODE_ENV === 'development') { console.log('Starting in development mode.') }

if (NODE_ENV === 'production') {
  https.createServer({
    key: fs.readFileSync(KEY, 'utf8'),
    cert: fs.readFileSync(CERT, 'utf8'),
  }, app).listen(PORT || DEFAULT_PORT)
} else {
  http.createServer(app).listen(PORT || DEFAULT_PORT)
}
