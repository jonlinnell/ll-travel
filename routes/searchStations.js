const searchStations = require('../lib/searchStations')
const router = require('express').Router()

router.get('/:string', (req, res) => {
  searchStations(req.params.string)
    .then(data => res.json(data))
})

module.exports = router
