import path from 'path';
import extend from 'extend';

const common = {
  stats: {
    colors: true,
    chunks: false
  },
  modules: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, '../api'),
          path.join(__dirname, '../components'),
          path.join(__dirname, '../core'),
          path.join(__dirname, '../data'),
          path.join(__dirname, '../routes'),
          path.join(__dirname, '../client.js'),
          path.join(__dirname, '../server.js')
        ],
        loaders: 'babel-loader'
      }
    ]
  }
};

const client = extend(true, {}, common, {
  entry: path.join(__dirname, '../client.js'),
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: 'client.js',
    publicPath: '/'
  }
});

const server = extend(true, {}, common, {
  entry: path.join(__dirname, '../server.js'),
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'server.js',
    libaryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: /^[a-z][a-z\/\.\-0-9]*$/i
});

export default [client, server];