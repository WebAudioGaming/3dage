module.exports = function(aggregatedCallbacks) {
    var added = 0,
        done = 0

    function evaluate() {
        if (done >= added) {
            aggregatedCallbacks.done()
        } else {
            aggregatedCallbacks.progress(done / added)
        }
    }

    return {
        newCallback: function newCallback() {
            added++
            return function() {
                done++
                evaluate()
            }
        },
        evaluateNow: evaluate
    }
}
