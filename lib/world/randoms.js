var Ke = require('kefir')

function randomOfMilisec (globalFilter, expectedTime) {
  return Ke.interval(Math.ceil(expectedTime / 10), 1)
    .filter(globalFilter)
    .filter(function () {
      return Math.random() < 0.1
    })
    .spy('rnd' + expectedTime)
}

function gaussianRand () {
  var squeeze = 4
  var rand = 0
  for (var i = 0; i < squeeze; i += 1) {
    rand += Math.random()
  }
  return rand / squeeze
}

function randomAboutEveryMilisec (globalFilter, expectedTime) {
  return Ke.interval(expectedTime, 1)
    .filter(globalFilter)
    .flatMap(function () {
      return Ke.later(gaussianRand() * expectedTime, 1)
    })
    .merge(Ke.later(gaussianRand() * expectedTime, 1))
}

module.exports = function (globalFilter) {
  return {
    rarely: randomOfMilisec.bind(null, globalFilter, 30000),
    often: randomOfMilisec.bind(null, globalFilter, 3000),
    veryOften: randomOfMilisec.bind(null, globalFilter, 1000),
    ofMilisec: randomOfMilisec.bind(null, globalFilter),
    aboutEveryMilisec: randomAboutEveryMilisec.bind(null, globalFilter)
  }
}
