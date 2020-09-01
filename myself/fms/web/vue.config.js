function resolve(dir) {
    return path.join(__dirname, dir)
}

const Timestamp = new Date().getTime()
const path = require('path')

const cdn = {
    css: [
        "https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css",
    ],
    js: [
        "https://unpkg.com/vue@2.6.11/dist/vue.min.js",
        "https://unpkg.com/vue-router@3.4.3/dist/vue-router.min.js",
        "https://unpkg.com/vuex@3.4.0/dist/vuex.min.js",
        "https://unpkg.com/element-ui@2.13.2/lib/index.js"
    ]
}

module.exports = {
    outputDir: "web",
    publicPath: './',
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            '/qtoolsOms': {
                target: 'http://192.168.2.36:8061',
                pathRewrite: {"^/qtoolsOms": ""},
                changeOrigin: true,
            }
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            cdn: cdn
        }
    },
    configureWebpack: (config) => {
        // 判断为生产模式下，去除console
        if (process.env.NODE_ENV === "production") {
            config.optimization.minimizer.map((arg) => {
                const option = arg.options.terserOptions.compress;
                option.drop_console = true; // 打开开关
                return arg;
            });
        }
        return {
            resolve: {
                alias: {
                    '@': resolve('src')
                }
            },
            output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
                filename: `js/[name].${Timestamp}.js`,
                chunkFilename: `js/[name].${Timestamp}.js`
            },
            externals: {
                'vue': "Vue",
                "element-ui": "ELEMENT",
                "vue-router": "VueRouter",
                'vuex': "Vuex"
            }
        }
    },
    chainWebpack(config) {

        // 移除 prefetch 插件
        config.plugins.delete('preload-index')
        // 移除 preload 插件
        config.plugins.delete('prefetch-index')

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
