var Ke = require('kefir')

module.exports = function (globalFilter) {
  return {
    once: function () {
      return Ke.constant(1) // combine with interval + filter, then take(1)
    },
    repeatedly: function (time) {
      return Ke.interval(time, 1).filter(globalFilter)
    }
  }
}
