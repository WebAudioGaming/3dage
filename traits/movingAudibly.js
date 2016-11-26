module.exports = function (options) {
  var sound = (options && options.sound) ? options.sound : 'ismoving'
  return {
    is: ['movingAudibly'],
    reacts: [
      function () {
        return this.position.map(function () {
          return sound
        })
      }
    ]
  }
}
