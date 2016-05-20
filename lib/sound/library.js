var Howl = require('howler')
var soundObject = require('./sound')

libraryDef = {
    sounds: {
        "hits": {
            src: [],
            sprite: optional,
            preload: optional
        },
        "narrator": {
            src: []
        }
    }
}

module.exports = function(libraryDefinition) {


    return {
        getPlayingSound: function(name) {
            var rawSound = new Howl({});
            var soundId = rawSound.play(spriteItemId)
            return soundObject(rawSound, soundId)
                //parse name
                //get howler object from cache
                //start playing it
        }
    }
}
