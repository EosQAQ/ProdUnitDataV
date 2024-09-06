const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    //port: 8080,
    proxy: {
      '/GFAPI': {
        target: 'http://10.78.44.80:20080/GFAPI/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/GFAPI': '' // 需要rewrite的,
        }
      },
    }
  },
}