var fastBindLast = require('../reusables/fastBindLast')

var API = {
  pos: 3,
  on: 2,
  off: 2,
  stop: 0,
  volume: 1
}

module.exports = function sound (howlerInstance, soundId) {
  var wrappers = fastBindLast(howlerInstance, soundId)
  return Object.keys(API).reduce(function (methods, name) {
    methods[name] = wrappers[API[name]](name)
    return methods
  }, {})
}
