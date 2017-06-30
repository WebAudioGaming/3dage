var test = require('tape')
var soundMock = require('../../soundMock')
var renderer = require('../../../../../lib/sound/renderer')

test('Renderer _.applyPos should apply position to a sound', function (t) {
  t.plan(2)
  var mock = soundMock()
  renderer._.applyPos(mock, [1, 2, 3])
  t.equal(mock.spies.pos.calls, 1)
  t.deepEqual(mock.spies.pos.args, [1, 2, 3])
})

test('Renderer _.soundFactory should create a sound stream for playing a sound once', function (t) {
  t.plan(4)
  var soundSpec = {
    sound: 'testing',
    times: 1
  }
  var mock = soundMock({
    event: {
      name: 'end',
      delay: 2
    }
  })
  var library = {
    getPlayingSound: function (sound) {
      t.equal(sound, soundSpec.sound, 'sound name passed correctly')
      return mock
    }
  }
  var soundObs = renderer._.soundFactory(library, soundSpec, [1, 2, 3])
  soundObs.observe({end: function () {
    t.equal(mock.spies.pos.calls, 1)
    t.deepEqual(mock.spies.pos.args, [1, 2, 3])
    t.equal(mock.spies.stop.calls, 1)
  }})
})
