const path = require('path')


module.exports = {
    dev: {
        proxyTable: {
            '/api': {
                target: 'http://192.168.0.11/?/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
        staticDir: './app/assets',    // 静态资源输出目录
        outputViewDir: '.',     // 模板输出目录
        srcDir: './app',        // 开发目录
        commonChunks: [],       // 预打包，需引入的公共js文件
        srcDirAbsolutePath: path.resolve(__dirname, '../../app'),
        publicPath: undefined,
        host: '0.0.0.0',
        port: 8080,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: false,
        showEslintErrorsInOverlay: false,

        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true,
    },

    build: {
        staticDir: './app/assets',    // 静态资源输出目录
        outputViewDir: './views/webpack',     // 模板输出目录
        srcDir: './app',        // 开发目录
        srcDirAbsolutePath: path.resolve(__dirname, '../../app'),
        commonChunks: ['./app/assets/common/vendor', './app/assets/common/common'],
        publicPath: '/static/',
        outputRootDir: path.resolve(__dirname, '../../../static/'),
        productionSourceMap: false,
        devtool: '#source-map',
        isExtract: true,
        productionGzip: false,
        productionGzipExtensions: [
            'js', 'css',
        ],
        bundleAnalyzerReport: process.env.npm_config_report,
    },
}
