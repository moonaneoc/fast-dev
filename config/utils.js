const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
    return path.posix.join('static', _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
            plugins: [
                require("postcss-import")(),
                require("postcss-url")(),
                require("autoprefixer")()
            ]
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.loadConfig = function () {
    var config = {};
    try {
        config = require(path.resolve(".fastdev"));
    } catch (e) { }
    return config;
}

exports.htmlConfig = function () {
    var template = exports.loadConfig().template || {};

    var config = {
        title: template.title || "fast-dev",
        filename: template.filename || 'index.html',
        template: typeof template === "string" ? path.resolve(template) : path.resolve(__dirname, "..", "template/index.ejs"),
        inject: true,
        platform: template.platform || "pc",
        assets: {
            js: template.js || [],
            css: template.css || []
        }
    }
    if (template.favicon) {
        config.favicon = path.resolve(template.favicon);
    }

    if (process.env.NODE_ENV === "production") {
        config.minify = {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        config.chunksSortMode = 'dependency';
    }
    return config;
}