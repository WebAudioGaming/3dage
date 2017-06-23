var test = require('tape')
var Ke = require('kefir')
var Thing = require('../../../../lib/thing')

test('Things should be created with the common API', function (t) {
  t.plan(6)

  var something

  t.doesNotThrow(function () {
    something = Thing({
      is: ['some'],
      sounds: {
        'a': {
          sound: 'knock'
        }
      }
    })
  })
  t.equal(typeof something, 'function')
  t.equal(typeof something().spawn, 'function')

  var some1
  t.doesNotThrow(function () {
    some1 = something().spawn({ tick: Ke.interval(100, 1) })
  })

  console.log(some1)

  t.ok(some1.sound instanceof Ke.Observable, 'thing::sound should be an observable')
  t.ok(some1.position instanceof Ke.Observable, 'thing::position should be an observable')
})

test('Things should expose functions from definition as their methods', function (t) {
  t.plan(3)

  var something

  t.doesNotThrow(function () {
    something = Thing({
      is: ['some'],
      functions: {
        stubbyStub: function () {
          t.pass('should be called')
        }
      }
    })

    var some1 = something().spawn({ tick: Ke.interval(100, 1) })
    t.equal(typeof some1.stubbyStub, 'function')
    some1.stubbyStub()
  })
})
