var Rx = require('rx')

module.exports = {
  render: function (source, library) {
    source.sound.subscribe(function (soundSpec) {
      var soundStream = source.position.take(1).flatMap(soundFactory.bind(null, library, soundSpec))
      trackPosition(soundStream, source.position)
    })
  },
  _trackPosition: trackPosition,
  _soundFactory: soundFactory
}

function trackPosition (soundStream, positionStream) {
  return Rx.Observable.combineLatest(soundStream, source.position, function (sound, pos) {
    return {
      sound: sound,
      pos: pos
    }
  })
    .takeWhile(function (pair) {
      return !!pair.sound
    })
    .subscribe(function (pair) {
      applyPos(pair.sound, pair.pos)
    })
}

function soundFactory (library, soundSpec, pos) {
  return Rx.Observable.create(function (observer) {
    var count = soundSpec.count || 1
    var finishedPlaybacks = 0
    var sound = library.getPlayingSound(soundSpec.name)
    applyPos(sound, pos)
    observer.onNext(sound)
    if (count < Infinity) {
      sound.on('end', function () {
        finishedPlaybacks++
        if (finishedPlaybacks >= count) {
          sound.stop()
          observer.onNext(null)
          observer.onCompleted()
        }
      })
    }
  })
}

function applyPos (sound, pos) {
  sound.pos(pos[0], pos[1], pos[2])
}
