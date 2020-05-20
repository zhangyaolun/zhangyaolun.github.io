const groupsFiles = require.context('./group', true, /\.js$/)

const groups = groupsFiles.keys().reduce((groups, groupsPath) => {
	let groupsName = groupsPath.replace(/^\.\/(.*)\.\w+$/, '$1')
	groupsName.indexOf('/') !== -1 ? groupsName = groupsName.split('/')[1] : ''
	const value = groupsFiles(groupsPath)
	groups[groupsName] = value.default
	return groups
}, {})

const defaultVal = {
	install(Vue) {
		Vue.prototype.$api = this
	}
}

Object.keys(groups).forEach((v, k) => {
	defaultVal[v] = groups[v]
})

export default defaultVal
