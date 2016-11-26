// incomplete
var dogDefinition = {
  is: ['dog'],
  defaults: {
    r: 1,
    v: 0.1
  },
  sounds: {
    'ismoving': {
      sound: ['step1','step2','step3'],
      times: 1
    },
    'jumpstop': {
      sound: ['jump'],
      times: 1
    },
    'happy': {
      sound: 'happy_bark',
      times: 2
    },
    'bark': {
      sound: 'bark3',
      times: 1
    }
  },
  reacts: [
    {
      to: world.random.rarely(), // can replace with a getter to remove parents :>
      with: 'bark'
    },
    {
      to: player.position,
      with: function (input) {
        if(Math.abs(input.x - this.x)< 10 && Math.abs(input.y - this.y)< 10){
          return "happy"
        }
      }
    }
    },
    function(){
      return this.position
      .someMagicToEmitOnlyIfPositionStoppedChanging()
      .map(function(){
        return 'jumpstop'
      })
    }
  ]

}

var movingAudibly = require('3dage/traits/movingAudibly')


var dog = Thing(dogDefinition, movingAudibly, colliding, following)
