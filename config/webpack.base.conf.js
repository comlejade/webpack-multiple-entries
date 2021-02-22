const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const rules = require('./webpack.rules.conf.js');
const copyWebpackPlugin = require('copy-webpack-plugin');

function getSeperatePath (url) {
  let paths = {
    fileName: '',
    exactName: ''
  }
}

function getEntry () {
  var entry = {};
  // 获得pages下所有页面的index.js
  let arr = glob.sync('./src/pages/**/*.js')
    arr.forEach(function (name) {
      var start = name.indexOf('src/'),
        end = name.length - 3;
      var eArr = [];
      // 去掉src和.js
      var n = name.slice(start, end);
      // 去掉js文件名，只保留pages/** 这样的文件夹的名字
      n = n.slice(0, n.lastIndexOf('/'))
      // 获取文件夹的名字
      n = n.split('pages/')[1];
      eArr.push(name);
      // 获得{文件夹(即页面的名字): 页面js入口路径}这样的对象
      entry[n] = eArr;
    })
  return entry
}

let entires = getEntry();

function getHTML () {
  var htmlPlugins = [];
  glob.sync('./src/pages/**/*.html')
    .forEach(function (name) {
      var start = name.indexOf('src/'),
        end = name.length - 5;
      // 去掉src和.html
      var n = name.slice(start, end);
      // 去掉js文件名，只保留pages/** 这样的文件夹的名字
      var folder = n.slice(0, n.lastIndexOf('/'))
      // 获取文件夹的名字
      var page = folder.split('pages/')[1];
      // console.log(name, page);
      htmlPlugins.push(new HtmlWebpackPlugin({
        template: name,
        filename: `${page}.html`,
        chunks: [page]
      }))
    })
  return htmlPlugins;
}

let htmlPlugins = getHTML()

// 多页面打包的原理就是配置多个HtmlWebpackPlugin，每一个对应一个页面，在每个的配置中通过chunks指定该页面需要引入的bundle.js
module.exports = {
  entry: entires,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: '/css/[name].css'
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets'),
          to: 'assets'
        }
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}