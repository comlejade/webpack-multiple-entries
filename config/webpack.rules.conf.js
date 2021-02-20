const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = [
  {
    test: /\.js$/,
    use: ['babel-loader'],
    include: path.resolve(__dirname, '../src')
  },
  {
    test: /\.(sass|scss)$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../src')
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 5120
      }
    }]
  }
]