'use strict'
module.exports = function (type, config) {
    require('./check-versions')()

    process.env.NODE_ENV = 'production'

    const merge = require('webpack-merge')
    const ora = require('ora')
    const rm = require('rimraf')
    const path = require('path')
    const chalk = require('chalk')
    const webpack = require('webpack')

    var webpackConfig = require('../config/webpack.build.' + (type || 'lib') + '.conf')
    if (config) {
        webpackConfig = merge(webpackConfig, require(path.resolve(config)));
    }

    const spinner = ora('building for production...')

    spinner.start()

    rm(path.join(path.resolve("dist"), 'static'), err => {
        if (err) throw err
        webpack(webpackConfig, (err, stats) => {
            spinner.stop()
            if (err) throw err
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + '\n\n')

            if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'))
                process.exit(1)
            }

            console.log(chalk.cyan('  Build complete.\n'))
            console.log(chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                '  Opening index.html over file:// won\'t work.\n'
            ))
        })
    })
}
