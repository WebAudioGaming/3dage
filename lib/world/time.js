var Ke = require('kefir')

module.exports = {
  once: function () {
    return Ke.constant(1)
  },
  repeatedly: function (time) {
    return Ke.interval(time, 1)
  }
}
