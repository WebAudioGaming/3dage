// This will search for js files and require them
// so that they are added to the webpack bundle
var context = require.context('.', true, /.+\.js?$/);
context.keys().forEach(context); //don't ask me what happens here, I found it online
module.exports = context;
