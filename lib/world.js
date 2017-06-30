var Ke = require('kefir')

var randoms = require('./world/randoms')

module.exports = function world (config) {
  return {
    tick: Ke.interval(config.tickInterval, 1),
    random: randoms,
    environment: {
      // TODO: make environment configurable by swatches in config so the user can say how windy etc. they want the world to be
      wind: randoms.ofMilisec(config.tickInterval * 200)
    }
  }
}
