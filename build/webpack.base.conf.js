const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const vueLoaderConfig = require('./webpack-config/vue-loader-conf')
const entryAndTemplateConfig = require('./webpack-config/entry.config.js')
const config = require('./webpack-config/')
const HappyPack = require('happypack')
const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('app')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})


// 资源文件(assets/*)的输出路径:  output.path + url-loader.name
// 用了CopyWebpackPlugin就不走上面的输出路径，直接就是CopyWebpackPlugin中配置的赋值路径
// ( css | js )的输出路径:   entry[].key
// html 文件输出路径: output.path + ...htmlWebpackPluginOption[].filename

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: entryAndTemplateConfig.configEntry,
    output: {
        path: config.build.outputRootDir,
        filename: '[name].js',
        // 所有页面 css js 引用的静态资源都会加上这个
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.publicPath
            : config.dev.publicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('app'),
            Plugins: resolve('app/plugins'),
        },
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.ejs$/,
                loader: 'ejs-compiled-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
            },
            {
                test: /\.js$/,
                // loader: 'babel-loader?cacheDirectory',
                use: 'happypack/loader?id=babel',
                include: [resolve('app'), resolve('node_modules/webpack-dev-server/client')],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    // 这个路径是相对于output.path
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('media/[name].[hash:7].[ext]')
                    name: '/dist/media/[name].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    name: '/dist/fonts/[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        ...entryAndTemplateConfig.htmlWebpackPluginOption,
        new HappyPack({ // 基础参数设置
            id: 'babel', // 上面loader?后面指定的id
            loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
            threadPool: happyThreadPool,
            verbose: true
        }),
        new webpack.LoaderOptionsPlugin({ options: {} }),
        new webpack.BannerPlugin('WeGene版权所有'),
    ],
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
}
