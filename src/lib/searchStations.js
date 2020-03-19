const stations = require('./railStations.json');

module.exports = searchString => new Promise(resolve => resolve(
  stations.filter(station => station.name
    .toLowerCase()
    .match(searchString.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))),
));
