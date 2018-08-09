const path = require('path')
const utils = require('./webpack-config/utils');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('./webpack-config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: config.build.isExtract}),
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.min.js',
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: `[name].css`,
            allChunks: true,
        }),
        // TODO: 针对多入口进行项目，开启子进程加速js文件串行打包压缩速度(目前页面少未发现优势)
        // new WebpackParallelUglifyPlugin({
        //     uglifyJS: {
        //         output: {
        //             beautify: false, //不需要格式化
        //             comments: false //不保留注释
        //         },
        //         compress: {
        //             warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        //             drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
        //             collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        //             reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        //         }
        //     }
        // }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../app/assets'),
                to: path.resolve(__dirname, '../../static/app/assets'),
                ignore: ['.*'],
            },
        ]),
        new webpack.DllReferencePlugin({
            context: `${__dirname}/../`,
            manifest: require('../vendor-manifest.json'),
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: `${config.build.staticDir}/common/vendor`,
                    enforce: true,
                },
                common: {
                    test: /[\\/]services|config|plugins|utils|components|style[\\/]/,
                    chunks: "initial",
                    name: `${config.build.staticDir}/common/common`,
                    enforce: true,
                },
                async: {
                    test: /[\\/]async-components[\\/]/,
                    chunks: "async",
                    name: `${config.build.staticDir}/common/async`,
                    enforce: true,
                }
            }
        },
        minimize: true
        // runtimeChunk: {
        //     name: "manifest"
        // }
    }
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
        }),
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
