var test = require('tape')
var library = require('../../../../../lib/sound/library')
var soundMock = require('../../soundMock')

test('Sound library loading progressStream emits progress as expected', function (t) {
  t.plan(6)
  var sources = [
    soundMock({event: {delay: 1, name: 'load'}}),
    soundMock({event: {delay: 2, name: 'load'}}),
    soundMock({event: {delay: 3, name: 'load'}}),
    soundMock({event: {delay: 4, name: 'load'}})
  ]
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
  var sources = [
    soundMock({event: {delay: 1, name: 'load'}}),
    soundMock({event: {delay: 2, name: 'loaderror'}}),
    soundMock({event: {delay: 3, name: 'load'}}),
    soundMock({event: {delay: 4, name: 'load'}})
  ]
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
