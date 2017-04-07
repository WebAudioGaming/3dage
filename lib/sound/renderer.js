var Rx = require('rxjs/Rx')

var _ = {
  applyPos: function applyPos (sound, pos) {
    sound.pos(pos[0], pos[1], pos[2])
    // TODO: stop the sound if position stream ends
  },
  trackPosition: function trackPosition (soundStream, positionStream) {
    return Rx.Observable.combineLatest(soundStream, positionStream, function (sound, pos) {
      return {
        sound: sound,
        pos: pos
      }
    })
    .takeWhile(function (pair) {
      return !!pair.sound
    })
    .subscribe(function (pair) {
      _.applyPos(pair.sound, pair.pos)
    })
  },
  soundFactory: function soundFactory (library, soundSpec, startingPos) {
    return Rx.Observable.create(function (observer) {
      var count = soundSpec.count || 1
      var finishedPlaybacks = 0
      var sound = library.getPlayingSound(soundSpec.name)
      _.applyPos(sound, startingPos)
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

}

module.exports = {
  render: function (source, library) {
    source.sound.subscribe(function (soundSpec) {
      var soundStream = source.position.take(1).flatMap(_.soundFactory.bind(null, library, soundSpec))
      _.trackPosition(soundStream, source.position)
    })
  },
  '_': _
}
