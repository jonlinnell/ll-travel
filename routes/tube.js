const cache = require('memory-cache')

const fetchTubeStatus = require('../lib/fetchTubeStatus')

const CACHE_KEY = 'tube'

module.exports = app =>
  app.get('/tube', (req, res) => {
    const cachedData = cache.get(CACHE_KEY)

    if (cachedData) {
      res.json(cachedData)
    } else {
      fetchTubeStatus()
        .then((data) => {
          cache.put(CACHE_KEY, data, 60000)
          res.json(data)
        })
        .catch(error => res.status(500).send(`An error occurred loading the tube data: ${error}`))
    }
  })
