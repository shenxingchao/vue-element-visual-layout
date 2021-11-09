// fix nedb see #https://github.com/louischatriot/nedb/issues/531    go to end
const fixNedbForElectronRenderer = {
  apply(resolver) {
    resolver
      .getHook('beforeDescribed-relative')
      .tapAsync(
        'FixNedbForElectronRenderer',
        (request, resolveContext, callback) => {
          if (!request.descriptionFileData.name === 'nedb') {
            return callback()
          }

          let relativePath
          if (
            request.path.startsWith(
              resolver.join(request.descriptionFileRoot, 'lib/storage')
            )
          ) {
            relativePath = 'lib/storage.js'
          } else if (
            request.path.startsWith(
              resolver.join(request.descriptionFileRoot, 'lib/customUtils')
            )
          ) {
            relativePath = 'lib/customUtils.js'
          } else {
            return callback()
          }

          const path = resolver.join(request.descriptionFileRoot, relativePath)
          const newRequest = Object.assign({}, request, { path })
          callback(null, newRequest)
        }
      )
  }
}

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },
  chainWebpack: config => {
    // fix nedb
    config.resolve
      .plugin('fixNedbForElectronRenderer')
      .use(fixNedbForElectronRenderer)
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
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true, //配置防止浏览器报错'__dirname' is not defind
      builderOptions: {
        appId: 'com.org.vue-element-visual-layout', //appId
        productName: 'vue-element-visual-layout', //安装目录名称
        copyright: 'Copyright © sxc', //版权
        directories: {
          buildResources: 'build', //打包时的资源文件夹
          output: './dist' //打包文件输出路径
        },
        win: {
          //windows平台配置
          target: [
            //打包类型
            'nsis' //打包为nsis安装文件
          ],
          icon: './public/favicon.ico' //app图标
        },
        nsis: {
          //nsis配置参数
          oneClick: false, //单击安装
          allowToChangeInstallationDirectory: true, //允许用户选择安装位置
          perMachine: true, //显示是否为所有用户安装程序
          allowElevation: true, //运行提升为管理员权限
          installerIcon: './public/favicon.ico', //安装图标
          uninstallerIcon: './public/favicon.ico', //卸载图标
          installerHeaderIcon: './public/favicon.ico', //安装头部图标
          deleteAppDataOnUninstall: false, //卸载时是否清除数据
          createDesktopShortcut: true, //创建桌面图标
          createStartMenuShortcut: false, //创建开始菜单图标
          shortcutName: '代码自动生成工具' //快捷图标名称
        },
        publish: [
          //更新参数 http服务器方式 其他方式见#https://www.electron.build/configuration/publish
          {
            provider: 'generic',
            url: 'http://xxx.xxx.com/download/' //存放软件版本的地址
          }
        ]
      }
    }
  }
}
