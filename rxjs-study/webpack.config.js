const path = require('path')

module.exports = {
  mode: 'none',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      JS: path.resolve(__dirname, 'src/assets/js/'),
      CSS: path.resolve(__dirname, 'src/assets/css/'),
      IMAGE: path.resolve(__dirname, 'src/assets/images/')
    }
  },
  devtool: 'chap-eval-source-map',
  devServer: {
    publicPath: '/dist/'
  }
}