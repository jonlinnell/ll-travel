const cache = require('memory-cache')

const getRailDepartureBoard = require('../lib/getRailDepartureBoard')

module.exports = app =>
  app.get('/rail/:station/:destination?', (req, res) => {
    const { station, destination } = req.params

    if (!station) res.status(400).send('No station specified.')

    const cacheRequestKey = `train-${station}${destination ? `-${destination}` : ''}`
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
