var Ke = require('kefir')

var randoms = require('./world/randoms')
var time = require('./world/time')

module.exports = function world (config) {
  var state = {
    stopped: false
  }

  function globalFilter () {
    return !state.stopped
  }

  var rands = randoms(globalFilter)

  return {
    freeze: function () {
      state.stopped = true
    },
    unfreeze: function () {
      state.stopped = false
    },
    tick: Ke.interval(config.tickInterval, 1).filter(globalFilter),
    random: rands,
    time: time(globalFilter),
    environment: {
      // TODO: make environment configurable by swatches in config so the user can say how windy etc. they want the world to be
      wind: rands.ofMilisec(config.tickInterval * 200).filter(globalFilter)
    }
  }
}
