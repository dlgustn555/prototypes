const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    devServer: {
        publicPath: '/dist/',
        contentBase: path.join(__dirname, 'dist'),
        port: 9003
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Server Test를 위한 index 페이지',
            template: 'index.html'
        })
    ]
}