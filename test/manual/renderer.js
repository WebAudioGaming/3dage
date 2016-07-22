var Rx = require('rx')
var library = require('../../lib/sound/library')
var renderer = require('../../lib/sound/renderer')

function noop () {}

var libr1 = library({
  sounds: {
    hits: {
      src: ['/mock/doh.wav'],
      preload: true,
      loop: true
    }
  }
})
var thing1 = {
  sound: Rx.Observable.just({
    name: 'hits',
    count: 42
  }),
  position: Rx.Observable.interval(300)
    .map(function (x) {
      return [((x % 40) - 20) * 2, 40, 5]
    })
// circle, but it doesn't sound right
// .map(ra.compose(ra.modulo(ra.__,36), ra.multiply(10 / 360 * 2 * Math.PI)))
// .map(function(theta) {
//     console.log('theta',theta/(2 * Math.PI))
//     var r = 15
//     var x = 0 + r * Math.cos(theta)
//     var y = 0 - r * Math.sin(theta)
//     return [x, y, 0]
// })
}

libr1.progress.subscribe(noop, function (err) {
  throw err
}, function () {
  console.log('done', arguments)

  renderer.render(thing1, libr1)
})
