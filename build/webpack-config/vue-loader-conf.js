const utils = require('./utils')
const config = require('./index')

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'local'
const sourceMapEnabled = isProduction
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap

module.exports = {
    loaders: utils.cssLoaders({ sourceMap: sourceMapEnabled, extract: isProduction }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
        video: [
            'src', 'poster',
        ],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
    },
}
