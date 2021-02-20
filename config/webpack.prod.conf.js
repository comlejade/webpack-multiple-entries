const {merge} = require('webpack-merge')
const baseConf = require('./webpack.base.conf.js')

module.exports = merge(baseConf, {
  mode: 'production'
})
