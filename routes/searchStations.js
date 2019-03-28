const router = require('express').Router()

const searchStations = require('../lib/searchStations')

router.get('/:string', (req, res) => {
  searchStations(req.params.string).then(data => res.json(data))
})

module.exports = router
