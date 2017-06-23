/* global IIIdage */
function runRenderer () {
  var Ke = IIIdage.Kefir

  var libr1 = IIIdage._.library({
    sounds: {
      hits: {
        src: ['../resources/uu.mp3'],
        loop: true
      }
    }
  })
  // var thing1 = IIIdage.Thing({
  //   is: ['some'],
  //   sounds: {
  //     'a': {
  //       sound: 'hits'
  //     }
  //   },
  //   reacts: [
  //     {
  //       to: Ke.later(300, 1),
  //       with: 'a'
  //     }
  //   ]
  // }).spawn({ tick: Ke.interval(100, 1) })

  var thing1 = {
    sound: Ke.constant({
      sound: 'hits',
      times: 42
    }),
    position: Ke.fromPoll(300, (function () {
      var x = 0
      return function () {
        return [((x++ % 40) - 20) * 2, 40, 5]
      }
    })())
  }

  // circle, but it doesn't sound right
  // .map(ra.compose(ra.modulo(ra.__,36), ra.multiply(10 / 360 * 2 * Math.PI)))
  // .map(function(theta) {
  //     console.log('theta',theta/(2 * Math.PI))
  //     var r = 15
  //     var x = 0 + r * Math.cos(theta)
  //     var y = 0 - r * Math.sin(theta)
  //     return [x, y, 0]
  // })

  libr1.progress.observe({
    error: function (err) {
      throw err
    },
    end: function () {
      console.log('done', arguments)

      IIIdage._.renderer.render(thing1, libr1)
    }})
}
