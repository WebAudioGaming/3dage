var Howl = require('howler')
var soundObject = require('./sound')

libraryDef = {
    sounds:{
        "hits":{
            src:[],
            sprite: optional,
            preload: optional
        },
        "narrator":{
            src:[]
        }
    }
}

module.exports = function(libraryDefinition){


    return {
        getPlayingSound: function(name){
            return soundObject(new Howl({}),spriteItemId).play()
            //parse name
            //get howler object from cache
            //start playing it
        }
    }
}
