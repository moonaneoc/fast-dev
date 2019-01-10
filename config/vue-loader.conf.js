'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: true,
        extract: isProduction
    }),
    cssSourceMap: true,
    cacheBusting: true,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
