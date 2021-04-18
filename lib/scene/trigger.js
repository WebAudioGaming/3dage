var Thing = require('../thing')(3)
var colliding = require('../../traits/colliding')(3)

module.exports = Thing({
  is: ['trigger'],
  reacts: [
    {
      to: trigger,
      with: 'a'
    }
  ]
}, colliding)
