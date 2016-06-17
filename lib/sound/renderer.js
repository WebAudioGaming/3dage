var Rx = require('rx')

module.exports = function(source, library) {

    source.sound.subscribe(function(soundSpec) {
        var soundStream = source.position.take(1).flatMap(soundFactory.bind(null, soundSpec))

        Rx.Observable.combineLatest(soundStream, source.position /*, globalSoundControl? */ )
            .takeWhile(function(sound, pos) {
                return !!sound
            })
            .subscribe(applyPos)
    })
}

function soundFactory(soundSpec, pos) {
    return Rx.Observable.create(function(observer) {
        var count = soundSpec.count || 1;
        var finishedPlaybacks = 0
        var sound = library.getPlayingSound(soundSpec.name)
        applyPos(sound, pos)
        observer.onNext(sound)
        if (count < Infinity) {
            sound.on('end', function() {
                finishedPlaybacks++
                if (finishedPlaybacks >= count) {
                    sound.stop()
                    observer.onNext(null)
                    observer.onComplete()
                }
            })
        }
    })
}

function applyPos(sound, pos) {
    sound.pos(pos[0], pos[1], pos[2])
}
