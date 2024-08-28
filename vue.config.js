const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");


module.exports = defineConfig({

  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
    plugins: [new NodePolyfillPlugin()],
  },
  transpileDependencies: true,
  lintOnSave:false, 
  publicPath: './',
  devServer:{
    historyApiFallback: true
  }
})


