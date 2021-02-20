const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConf = require('./webpack.base.conf.js')

module.exports = merge(baseConf, {
  mode: 'development',
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

