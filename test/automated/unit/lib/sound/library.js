var test = require('tape')
var library = require('../../../../../lib/sound/library')

function soundMock (delay, eventName) {
  function fakelistener (name, cb) {
    if (name === eventName) {
      setTimeout(cb, delay || 0)
    }
  }
  return {
    once: fakelistener,
    on: fakelistener,
    state: function () {},
    xsoundName: 'mock',
    _src: 'howlerPrivateSrc'
  }
}

test('Sound library loading progressStream emits progress as expected', function (t) {
  t.plan(6)
  var sources = [soundMock(1, 'load'), soundMock(2, 'load'), soundMock(3, 'load'), soundMock(4, 'load')]
  var progressStream = library._.preloadingProgressFromSources(sources)

  var progressValues = []
  progressStream.observe(function (progressFraction) {
    progressValues.push(progressFraction)
    t.ok(progressFraction >= 0 && progressFraction < 1, 'progress value is a fraction ' + progressFraction)
  }, function (err) {
    throw err
  }, function () {
    t.deepEqual(progressValues, [ 0, 0.25, 0.5, 0.75 ], 'progress was emitted for each load event')
    t.pass('it finishes when all loaded')
  })
})

test('Sound library loading progressStream errors out on failed sound', function (t) {
  t.plan(6)
  var sources = [soundMock(1, 'load'), soundMock(2, 'loaderror'), soundMock(3, 'load'), soundMock(4, 'load')]
  var progressStream = library._.preloadingProgressFromSources(sources)

  var progressValues = []
  progressStream.observe(function (progressFraction) {
    progressValues.push(progressFraction)
    t.ok(progressFraction >= 0 && progressFraction < 1, 'progress value is a fraction ' + progressFraction)
  }, function (err) {
    t.pass('error has been thrown ' + err)
    t.equal(err, 'Error loading sound "mock" from howlerPrivateSrc')
  }, function () {
    t.deepEqual(progressValues, [ 0, 0.25 ], 'progress was emitted for each load event')
    t.pass('it finishes after the error')
  })
})
