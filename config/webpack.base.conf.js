'use strict'
const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require("./utils")

var baseConfig = {
  context: path.resolve(__dirname, '..', "node_modules"),
  entry: {
    app: path.resolve()
  },
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
      '@': path.resolve(''),
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
        include: [path.resolve('src'), path.resolve('test'), path.join(__dirname, '..', 'node_modules/webpack-dev-server/client')]
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

const config = utils.loadConfig();
if (config.entry) {
  if (typeof config.entry === "string") baseConfig.entry = path.resolve(config.entry);
  else {
    var entry = {};
    for (var k in config.entry) {
      if (!Object.prototype.hasOwnProperty.call(config.entry, k)) continue;
      entry[k] = path.resolve(config.entry[k]);
    }
    baseConfig.entry = entry;
  }
}

module.exports = baseConfig