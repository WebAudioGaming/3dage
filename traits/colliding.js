var vNormalize = require('vectors/normalize')(3)
var vSub = require('vectors/sub')(3)
var vMagnitude = require('vectors/mag')(3)

module.exports = function (options) {
  options = options
  return {
    attributes: {},
    is: ['colliding'],
    reacts: [
      
      function () {
        var self = this
        return this.scene.player.attributes.pos.filter(function (xyz) {
          return vMagnitude(vSub(xyz, self.attributes.pos)) < (self.attributes.v)
        }).take(1)
        .subscribe(function () {
          scene
        })
      }
    ],
    functions: {
      goTowards: function (coords) {
        this.attributes.goingTowards = coords
        this.attributes.dir = vNormalize(vSub(coords, this.attributes.pos))
        this.attributes.v = this.defaults.v
        var self = this //TODO: delete this line and bind `this` to the chain nicely
        this.position
          .filter(function () {
            return vMagnitude(vSub(coords, self.attributes.pos)) < (options.closeEnough || (self.attributes.v + 1))
          })
          .take(1)
          .subscribe(function () {
            self.attributes.v = 0
            self.attributes.goingTowards = null
          })
      },
      stop: function () {
        this.attributes.v = 0
        this.attributes.goingTowards = null
      }
    }
  }
}
