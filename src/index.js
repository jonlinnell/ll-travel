#!/usr/bin/env node
/* eslint-disable no-console */

require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const routesBus = require('./routes/bus');
const routesRail = require('./routes/rail');
const routesTube = require('./routes/tube');
const routesSearchStations = require('./routes/searchStations');

const DEFAULT_PORT = 3000;

const app = express();

const {
  ORIGIN, USE_TEST_DATA, NODE_ENV, PORT,
} = process.env;

const requiredOptions = ['TFL_APP_ID', 'TFL_APP_KEY', 'DARWIN_TOKEN'];

requiredOptions.forEach((option) => {
  if (!Object.keys(process.env).includes(option)) throw new Error(`[backend] Required environment variable ${option} is not defined in .env .`);
});

const stream = rfs('logs/london-travel.log', {
  size: '1M',
  interval: '1d',
  rotate: 31,
  compress: true,
});

const corsOptions = {
  origin: ORIGIN || true,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(
  morgan(NODE_ENV === 'development' ? 'dev' : 'combined', {
    stream: NODE_ENV === 'development' ? process.stdout : stream,
  }),
);

app.use('/bus', routesBus);
app.use('/rail', routesRail);
app.use('/tube', routesTube);
app.use('/searchStations', routesSearchStations);

if (USE_TEST_DATA) {
  console.log('Using test data. Unset USE_TEST_DATA to use live feeds.');
}

if (NODE_ENV === 'development') {
  console.log('Starting in development mode.');
}

const port = PORT || DEFAULT_PORT;

app.listen(port, () => console.log(`Listening on port ${port}.`));
