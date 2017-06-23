var Ke = require('kefir')

module.exports = function world (config) {
  return {
    tick: Ke.interval(config.tickInterval, 1)
  }
}
