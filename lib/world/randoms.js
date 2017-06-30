var Ke = require('kefir')

function randomOfMilisec (expectedTime) {
  return Ke.interval(Math.ceil(expectedTime / 10), 1)
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

function randomAboutEveryMilisec (expectedTime) {
  return Ke.interval(expectedTime, 1)
    .flatMap(function () {
      return Ke.later(gaussianRand() * expectedTime, 1)
    })
    .merge(Ke.later(gaussianRand() * expectedTime, 1))
}

module.exports = {
  rarely: randomOfMilisec.bind(null, 30000),
  often: randomOfMilisec.bind(null, 3000),
  veryOften: randomOfMilisec.bind(null, 1000),
  ofMilisec: randomOfMilisec,
  aboutEveryMilisec: randomAboutEveryMilisec
}
