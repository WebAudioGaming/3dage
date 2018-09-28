var library = require('./sound/library')
var renderer = require('./sound/renderer')
var playerFactory = require('./player')

module.exports = function Scene (definition) {
  // TODO: allow passing a library instance, prevent it from being unloaded if passed from the outside
  var localLibrary = library(definition.library)
  var things = []
  var scene = {
    title: definition.title,
    things: things,
    loaded: function (callback) {
      localLibrary.progress.observe({
        end: callback
      })
    },
    load: function load (onprogress) {
      if (onprogress) {
        localLibrary.progress.observe({
          value: onprogress,
          end: function () {
            onprogress(1)
          }
        })
      } else {
        localLibrary.progress.observe({
          end: function () {
            console.log('lib loaded, ready')

            // done
          }
        })
      }
      return scene
    },
    run: function run () {
      localLibrary.progress.observe({
        end: function () {
          console.log('lib loaded, running')
          scene.player = playerFactory(definition.world) // TODO should it be exposed that way?
          definition.things.forEach(function spawnToScene (thing) {
            var athing = thing.spawn(definition.world)
            renderer.render(athing, localLibrary)
            things.push(athing)
          })
        }
      })
      return scene
    },
    destroy: function destroy () {
      // TODO destroy things
      things.map(/* ... */)
      // unload library
    },
    dev: {
      trace: function (render) {
        localLibrary.progress.observe({
          end: function () {
            console.log(things)
            things.forEach(function (thing) {
              thing.position.observe(function (xyz) {
                render(thing, xyz)
              })
            })
          }
        })
      }
    }
  }
  return scene
}
