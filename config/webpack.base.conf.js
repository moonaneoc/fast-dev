'use strict'
const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require("./utils")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var packageConfig = {};
try {
  packageConfig = require(path.resolve('./package.json'));
} catch (e) { }

var baseConfig = {
  context: path.resolve(__dirname, '..', "node_modules"),
  entry: {},
  output: {
    path: path.resolve("dist"),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "..", "node_modules")
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  resolveLoader: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "..", "node_modules")
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('src'), path.resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

baseConfig.entry[packageConfig.__package__name || "app"] = path.resolve(process.env.entry || '');

module.exports = baseConfig