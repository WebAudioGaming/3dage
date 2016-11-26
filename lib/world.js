var Rx = require('rx')

module.exports = function world (config) {
  return {
    tick: Rx.Observable.interval(config.tickInterval)
  }
}
