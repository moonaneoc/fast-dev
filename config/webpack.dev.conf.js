'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const notifier = require('node-notifier')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const utils = require("./utils.js")

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: "cheap-module-eval-source-map",

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || "localhost",
        port: PORT || 8080,
        open: false,
        overlay: { warnings: false, errors: true },
        // publicPath: "/",
        proxy: {},
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false,
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin(utils.htmlConfig()),
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || 8080
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: function (severity, errors) {
                    if (severity !== 'error') return

                    const error = errors[0]
                    const filename = error.file && error.file.split('!').pop()

                    notifier.notify({
                        title: "fast-dev",
                        message: severity + ': ' + error.name,
                        subtitle: filename || ''
                    })
                }
            }))

            resolve(devWebpackConfig)
        }
    })
})
