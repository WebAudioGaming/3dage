// var Ke = require('kefir')
var Howler = require('howler').Howler

module.exports = function playerFactory (world) {
  Howler.pos(0, 0, 0)
  Howler.orientation(0, 0, 1, 0, 1, 0) // TODO figure out how this works and where it should point

  var _ = {

  }
  var attributes = {
    pos: [0, 0, 0]
  }

  var position = world.tick
  .map(function () {
    return attributes.pos
  })
  .skipDuplicates(function (a, b) {
    return (
      a[0] === b[0] &&
      a[1] === b[1] &&
      a[2] === b[2]
    )
  })

  position.observe({value: function (pos) {
    Howler.pos(pos[0], pos[1], pos[2])
  }})

  return {
    position: position,
    attributes: attributes,
    _: _
  }
}
