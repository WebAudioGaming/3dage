var Rx = require('rxjs/Rx')

module.exports = function world (config) {
  return {
    tick: Rx.Observable.interval(config.tickInterval)
  }
}
