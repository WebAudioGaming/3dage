module.exports = function soundMock (options) {
  options = options || { event: {name: 'load', delay: 1} }
  function fakelistener (name, cb) {
    if (name === options.event.name) {
      setTimeout(cb, options.event.delay)
    }
  }
  var spies = {}
  function spy (name) {
    spies[name] = {calls: 0, args: null}
    return function () {
      spies[name].calls++
      spies[name].args = Array.from(arguments)
    }
  }
  return Object.assign({
    spies: spies,
    once: fakelistener,
    on: fakelistener,
    stop: spy('stop'),
    state: spy('status'),
    pos: spy('pos'),
    xsoundName: 'mock',
    _src: 'howlerPrivateSrc'
  }, options.functions)
}
