/* global IIIdage */
function runLibrary () {
  var libr1 = IIIdage._.library({
    sounds: {
      'hits': {
        src: ['../resources/uu.mp3'],
        loop: false // will not be repeated even if 'times:x' is used
      },
      'stuff': {
        src: ['../resources/uu.mp3']
      }
    }
  })

  // assert libr1.progress stream emits and ends
  libr1.progress.observe(function (progressFraction) {
    console.log('progress', progressFraction)
    console.log('assert', progressFraction >= 0 && progressFraction <= 1)
  }, function (err) {
    throw err
  }, function () {
    console.log('done', arguments)
    libr1.getPlayingSound('hits')

  // it ends, try playing a sound
  })
}
