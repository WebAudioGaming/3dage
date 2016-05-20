var fastBindLast = require('../reusables/fastBindLast')

var API = {
    pos: 3,
    on: 2,
    stop: 0,
    play: 0,
    volume: 1
}

module.exports = function sound(howlerInstance, spriteItemId) {
    var wrappers = fastBindLast(howlerInstance, spriteItemId)
    return Object.keys(API).reduce(function(methods, name) {
        methods[name] = wrappers[API[name]](name)
        return methods
    }, {})
}
