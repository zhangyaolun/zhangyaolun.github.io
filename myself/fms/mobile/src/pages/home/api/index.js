const modulesFiles = require.context('./group', true, /\.js$/)

const api = modulesFiles.keys().reduce((modules, modulePath) => {
    let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    moduleName.indexOf('/') !== -1 ? moduleName = moduleName.split('/')[1] : ''
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default {
    install(Vue) {
        Vue.prototype.$api = this
    },
    ...api
}
