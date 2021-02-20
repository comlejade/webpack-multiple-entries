const path = require('path')
const glob = require('glob')

function getEntry () {
  var entry = {};
  // debugger
  console.log('***** handle entries *****')
  glob.sync('../src/pages/**/*.js')
    .forEach(function (name) {
      var start = name.indexOf('src/'),
        end = name.length - 3;
      var eArr = [];
      var n = name.slice(start, end);
      n = n.slice(0, n.lastIndexOf('/'))
      n = n.split('pages/')[1];
      eArr.push(name);
      entry[n] = eArr;
    })
  return entry
}


module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  }
}