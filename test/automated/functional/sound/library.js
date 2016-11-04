var test = require('tape-catch')
var library = require('../../../../lib/sound/library')
var noop = function () {}
var rethrow = function (err) { throw err }
var is = require('check-more-types')

test('func>> should initialize library', function (t) {
  t.plan(4)
  var libr1
  t.doesNotThrow(function () {
    libr1 = library({
      sounds: {
        'hits': {
          src: ['uu.mp3']
        },
        'stuff': {
          src: ['uu.mp3']
        }
      }
    })
  })

  var progressValues = []
  libr1.progress.subscribe(function (progressFraction) {
    progressValues.push(progressFraction)
    t.ok(progressFraction > 0 && progressFraction < 1, 'progress value is a fraction')
  }, function (err) {
    throw err
  }, function () {
    t.deepEqual(progressValues, [ 0.5 ], 'progress was emitted for each load event')
    t.pass('it finishes when all loaded')
  })
})

test('func>> should play a sound', function (t) {
  t.plan(5)
  var libr1
  t.doesNotThrow(function () {
    libr1 = library({
      sounds: {
        'hits': {
          src: ['uu.mp3'],
          volume: 0.4
        }
      }
    })
  })

  libr1.progress.subscribe(noop, rethrow, function () {
    t.pass('sound loaded')

    var sound1 = libr1.getPlayingSound('hits')
    t.ok(is.fn(sound1.pos), 'has sound method pos')
    t.ok(is.fn(sound1.stop), 'has sound method stop')
    t.ok(is.fn(sound1.volume), 'has sound method volume')
  })
})
