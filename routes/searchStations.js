const searchStations = require('../lib/searchStations')

module.exports = app => app.get('/searchStations/:string', (req, res) => {
  searchStations(req.params.string)
    .then(data => res.json(data))
})
