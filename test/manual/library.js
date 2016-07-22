var library = require('../../lib/sound/library')

var libr1 = library({
  sounds: {
    'hits': {
      src: ['/mock/doh.wav'],
      preload: true // I will have to force preload on those
    // 'load' event needs to be used to track preloading stuff to the library
    // but before plugging into an event, check instance's .state() to see if it's not loaded
    },
    'stuff': {
      src: ['/mock/doh.wav'],
      preload: true // I will have to force preload on those
    // 'load' event needs to be used to track preloading stuff to the library
    // but before plugging into an event, check instance's .state() to see if it's not loaded
    }
  }
})

// assert libr1.progress stream emits and ends
libr1.progress.subscribe(function (progressFraction) {
  console.log('progress', progressFraction)
  console.log('assert', progressFraction >= 0 && progressFraction <= 1)
}, function (err) {
  throw err
}, function () {
  console.log('done', arguments)
  var sound1 = libr1.getPlayingSound('hits')

// it ends, try playing a sound
})
