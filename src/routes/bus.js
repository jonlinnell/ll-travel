const cache = require('memory-cache');
const router = require('express').Router();

const getBusDepartures = require('../lib/getBusDepartures');

router.get('/:stopCode/:limit?', (req, res) => {
  if (!req.params.stopCode) res.status(400).send('No stop code provided.');

  const cacheRequestKey = `bus-${req.params.stopCode}`;
  const cachedData = cache.get(cacheRequestKey);

  if (cachedData) {
    res.json(cachedData);
  } else {
    getBusDepartures(req.params)
      .then((data) => {
        cache.put(cacheRequestKey, data, 20000);
        res.json(data);
      })
      .catch(error => res.status(500).send(`An error occurred loading the bus data: ${error}`));
  }
});

module.exports = router;
