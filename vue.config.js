const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv-webpack')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new dotenv()
    ],
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss:{
        // eslint-disable-next-line quotes
        additionalData: `@import "~@/scss/main.scss";`
      }
    }
  }
})
