# Benes

> power by webpack | vue

> 这个cli用于兼顾后台模板，使用后台路由的改造


## Build Setup

``` bash
# install dependencies
cnpm install

# pre build
npm run dll

# development
npm run dev

# build for production with minification
npm run build

```
***

## 目录
- static    服务器静态资源目录
    - dist
        - common 打包完公共css/js存放目录
        - img 打包图片存放目录
        - [pageName]  打包后页面css/js存放目录
- views
    - default
        - [pageName] 打包后的htm页面
- webpack 前端独立开发目录
    - app  开发目录
        - assets  公共静态资源
        - components  vue公用组件
        - config  项目配置(拦截器...)
        - layout  布局文件(公用头部/尾部)
        - plugins vue自定义插件
        - services    服务api
        - style   公共样式
        - utils   工具库
        - views   页面
    - build   webpack配置文件目录
***

## 备注
- _webpack/app/views中文件夹的路径需要和后台的路由配置一致，打包后的路径和'views/default/'是一致的_
- _api转发需要自行修改



- _需要在本地调用后台登录接口后才能调用其他接口页面http://localhost:[port]/login-index.htm(不会打包进去)_
