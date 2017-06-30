var library = require('./sound/library')
var renderer = require('./sound/renderer')

module.exports = function Scene (definition) {
  // TODO: allow passing a library instance, prevent it from being unloaded if passed from the outside
  var localLibrary = library(definition.library)
  var things = []
  var scene = {
    things: things,
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
            // done
          }
        })
      }
      return scene
    },
    run: function run () {
      localLibrary.progress.observe({
        end: function () {
          things.concat(definition.things.map(function spawnToScene (thing) {
            var athing = thing.spawn(definition.world)
            renderer.render(athing, localLibrary)
            return athing
          }))
        }
      })
      return scene
    },
    destroy: function destroy () {
      // destroy things
      things.map(/* ... */)
      // unload library
    }
  }
  return scene
}
