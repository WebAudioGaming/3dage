var test = require('tape')
var library = require('../../../../../lib/sound/library')

function soundMock (delay) {
  return {
    on: function (name, cb) {
      setTimeout(cb, delay || 0)
    }
  }
}

test('Sound library loading progressStream emits progress as expected', function (t) {
  t.plan(5)
  var sources = [soundMock(1), soundMock(2), soundMock(3), soundMock(4)]
  var progressStream = library._.preloadingProgressFromSources(sources)

  var progressValues = []
  progressStream.subscribe(function (progressFraction) {
    progressValues.push(progressFraction)
    t.ok(progressFraction > 0 && progressFraction < 1, 'progress value is a fraction')
  }, function (err) {
    throw err
  }, function () {
    t.deepEqual(progressValues, [ 0.25, 0.5, 0.75 ], 'progress was emitted for each load event')
    t.pass('it finishes when all loaded')
  })
})
