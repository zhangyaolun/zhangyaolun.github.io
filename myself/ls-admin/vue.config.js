function resolve (dir) {
  return path.join(__dirname, dir)
}
const Timestamp = new Date().getTime()
const path = require('path')
module.exports = {
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      'https://srslawson.api.yorentick.cn': {
        target: 'https://srslawson.api.yorentick.cn',
        ws: true,
        changOrigin: true
      },
      'https://lawsonadmin.api.yorentick.cn': {
        target: 'https://lawsonadmin.api.yorentick.cn',
        ws: true,
        changOrigin: true
      },
      'https://lawsonapp.api.yorentick.cn': {
        target: 'https://lawsonapp.api.yorentick.cn',
        ws: true,
        changOrigin: true
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    }
  },
  chainWebpack (config) {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
