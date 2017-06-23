/* global IIIdage */
var Ke = IIIdage.Kefir

var world = IIIdage.World({
  tickInterval: 200
})

var trigger = Ke.later(2000, 1)

function runAll () {
  var libr1 = IIIdage._.library({
    sounds: {
      'hits': {
        src: ['../resources/uu.mp3'],
        preload: true // I will have to force preload on those
      }
    }
  })

  var something = IIIdage.Thing({
    is: ['some'],
    sounds: {
      'a': {
        sound: 'hits',
        times: 3
      }
    },
    reacts: [
      {
        to: trigger,
        with: 'a'
      }
    ]
  })

  libr1.progress.observe({
    error: function (err) {
      throw err
    },
    end: function () {
      console.log('library loaded', arguments)

      var some1 = something({ v: 1, debug: 'hi' }).spawn(world)
      IIIdage._.renderer.render(some1, libr1)
    }})
}
