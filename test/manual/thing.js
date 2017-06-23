/* global IIIdage */
var Ke = IIIdage.Kefir

// var scheduler = new Rx.TestScheduler()

// Create hot observable which will start firing
// var tick = scheduler.createHotObservable('-a-b-c', { a: 1, b: 2, c: 3 })
var tick = Ke.interval(100, 1)
var trigger = Ke.interval(2000, 1)

function runThing () {
  var something = IIIdage.Thing({
    is: ['some'],
    sounds: {
      'a': {
        sound: 'hits'
      }
    },
    reacts: [
      {
        // call: function () { return trigger },
        to: trigger,
        with: 'a'
      }
    ]
  })

  var worldStub = {
    tick: tick
  }

  var some1 = something.spawn(worldStub, { v: 1, debug: 'hi' })

  console.log(some1)

  some1.position.observe(function (x) {
    // console.log('pos upd', x)
  })

  some1.sound.observe(function (x) {
    console.log('snd upd', x)
  })

  // scheduler.start()
}
