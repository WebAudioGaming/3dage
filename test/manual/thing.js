var Rx = IIIdage.Rx

var onNext = Rx.ReactiveTest.onNext,
  onCompleted = Rx.ReactiveTest.onCompleted

var scheduler = new Rx.TestScheduler()

// Create hot observable which will start firing
var tick = scheduler.createHotObservable(
  onNext(100, 1),
  onNext(200, 2),
  onNext(300, 3),
  onCompleted(400)
)

function runThing () {
  var something = IIIdage.Thing({
    is: ['some'],
    sounds: {
      'a': {
        sound: 'knock'
      }
    }
  })

  var worldStub = {
    tick: tick
  }

  some1 = something.spawn(worldStub)

  console.log(some1)

  some1.position.subscribe(function (x) {
    console.log(x)
  })

  var re = scheduler.startWithCreate(function () {
    return some1.position.subscribe(function (x) {
      console.log(x)
    })
  })
}
