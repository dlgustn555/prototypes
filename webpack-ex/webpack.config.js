const path = require('path')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'dist'
  },
  devServer: {
    publicPath: '/dist/',
    port: '9000'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  ['style-loader', 'css-loader']
      }
    ]
  }
}