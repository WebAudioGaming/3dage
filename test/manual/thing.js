/* global: IIIdage */
var Rx = IIIdage.Rx

// var scheduler = new Rx.TestScheduler()

// Create hot observable which will start firing
// var tick = scheduler.createHotObservable('-a-b-c', { a: 1, b: 2, c: 3 })
var tick = Rx.Observable.interval(100)
var trigger = Rx.Observable.interval(250)

function runThing () {
  var something = IIIdage.Thing({
    is: ['some'],
    sounds: {
      'a': {
        sound: 'knock'
      }
    },
    reacts: [
      {
        call: function(){ return trigger },
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

  // ts.expectObservable(actual$).toBe(expected, values);
  // Rx.expectObservable(some1.position).toBe('-')

  some1.position.subscribe(function (x) {
    // console.log('pos upd', x)
  })

  some1.sound.subscribe(function (x) {
    console.log('snd upd', x)
  })

  // scheduler.start()
}
