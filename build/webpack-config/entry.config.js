const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./index.js')
const glob = require('glob')
const path = require('path')

const options = {
    cwd: `${config.dev.srcDirAbsolutePath}/views`, // 在pages目录里找模板，入口文件
    sync: true, // 这里不能异步，只能同步
}
let entryReg, pageReg, staticDir, srcDir, outputViewDir
if (process.env.NODE_ENV === 'production') {
    entryReg = '!(_|login|template)*/**/!(_)*.js'
    pageReg = '!(_|login|template)*/**/!(_)*.ejs'
    staticDir = config.build.staticDir
    srcDir = config.build.srcDir
    outputViewDir = config.build.outputViewDir
} else {
    entryReg = '!(_)*/**/!(_)*.js'
    pageReg = '!(_)*/**/!(_)*.ejs'
    staticDir = config.dev.staticDir
    srcDir = config.dev.srcDir
    outputViewDir = config.dev.outputViewDir
}
entryFile = new glob.Glob(entryReg, options).found // 入口文件
pageTemplate = new glob.Glob(pageReg, options).found // 对应的模板

const configEntry = {}
const entryFileArr = []
const configTemplate = {}
const htmlWebpackPluginOption = []
entryFile.forEach((file) => {
    entryFileArr.push(file.replace('.js', ''))
    configEntry[`${staticDir}/pages/${file.replace('.js','')}`] = `${srcDir}/views/${file}`
})
pageTemplate.forEach((page, index) => {
    const arr = page.split('/')
    arr.pop()
    const dir = arr.join('/')
    configTemplate[`${outputViewDir}/${dir}`] = {
        templatePath: `${srcDir}/views/${page}`,
        entryFilePath: `${staticDir}/pages/${entryFileArr[index]}`,
    }
})


for (const key in configTemplate) {
    if (Object.prototype.hasOwnProperty.call(configTemplate, key)) {
        let pageName = configTemplate[key].templatePath.split('/').pop()
        let fileName = key.replace(/\.\//g, '').split('/').join('_') + '-' +  pageName      // 同级名字拼接，页面放在根目录，方便dev引用异步组件
        let phpPageName = pageName.replace('ejs', 'htm')
        htmlWebpackPluginOption.push(new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'production'
                ? `../${key}/${phpPageName}`
                : fileName,
            title: pageName,
            isProduct: process.env.NODE_ENV === 'production',
            chunks: process.env.NODE_ENV === 'production'
                ? config.build.commonChunks.concat([configTemplate[key].entryFilePath])
                : config.dev.commonChunks.concat([configTemplate[key].entryFilePath]), // 这里的chuns的值必须对应entry中的key，会自动引入填写在这里的文件
            template: configTemplate[key].templatePath,
            chunksSortMode: 'dependency',
        }))
    }
}
module.exports = { configEntry, htmlWebpackPluginOption }
