var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
// var  isProduction = true
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: true,
    extract: isProduction
  })
}
