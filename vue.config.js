module.exports = {
  chainWebpack: config => {
    // svg 配置 开始
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // svg配置结束
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/value.scss";'
      }
    }
  }
}
