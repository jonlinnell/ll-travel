const cache = require('memory-cache')

const fetchTubeStatus = require('./lib/fetchTubeStatus')
const getBusDepartures = require('./lib/getBusDepartures')
const getRailDepartureBoard = require('./lib/getRailDepartureBoard')
const searchStations = require('./lib/searchStations')

const CACHE_PREFIX = '__server__'
const CACHE_TUBE = `${CACHE_PREFIX}-tube`
const CACHE_BUS = `${CACHE_PREFIX}-bus`
const CACHE_TRAIN = `${CACHE_PREFIX}-train`

const routes = (app) => {
  app.get('/tube', (req, res) => {
    const cachedData = cache.get(CACHE_TUBE)

    if (cachedData) {
      res.json(cachedData)
    } else {
      fetchTubeStatus()
        .then((data) => {
          cache.put(CACHE_TUBE, data, 60000)
          res.json(data)
        })
        .catch(error => res.status(500).send(`An error occurred loading the tube data: ${error}`))
    }
  })

  app.get('/bus/:stopCode/:limit?', (req, res) => {
    // const { stopCode, limit } = req.params

    if (!req.params.stopCode) res.status(400).send('No stop code provided.')

    const cacheRequestKey = `${CACHE_BUS}-${req.params.stopCode}`
    const cachedData = cache.get(cacheRequestKey)

    if (cachedData) {
      res.json(cachedData)
    } else {
      getBusDepartures(req.params)
        .then((data) => {
          cache.put(cacheRequestKey, data, 20000)
          res.json(data)
        })
        .catch(error => res.status(500).send(`An error occurred loading the bus data: ${error}`))
    }
  })

  app.get('/rail/:station/:destination?', (req, res) => {
    const { station, destination } = req.params

    if (!station) res.status(400).send('No station specified.')

    const cacheRequestKey = `${CACHE_TRAIN}-${station}${destination ? `-${destination}` : ''}`
    const cachedData = cache.get(cacheRequestKey)

    if (cachedData) {
      res.json(cachedData)
    } else {
      getRailDepartureBoard(req.params)
        .then((data) => {
          cache.put(cacheRequestKey, data, 30000)
          res.json(data)
        })
        .catch(error => res.status(500).send(error))
    }
  })

  app.get('/searchStations/:string', (req, res) => {
    searchStations(req.params.string)
      .then(data => res.json(data))
  })
}

module.exports = routes
