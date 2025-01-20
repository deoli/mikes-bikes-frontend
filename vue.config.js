const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true, // Enable Hot Module Replacement
    liveReload: true, // Enable live reloading
    watchFiles: ['src/**/*', 'public/**/*'], // Watch for changes in these directories
  }
})
