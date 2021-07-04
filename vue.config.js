module.exports = {

  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    // Pug loader
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
        .end()
  },
  runtimeCompiler: true
}