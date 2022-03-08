const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      poll: true,
    },
    devServer: {
      host: 'localhost',
      port: '8080',
    },
  },
})
