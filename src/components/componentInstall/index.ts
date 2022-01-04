//导入svgicon库
import * as ElIconModules from '@element-plus/icons'

const componentInstall = {
  install: function (app: any, options: any) {
    // 统一注册el-icon图标
    for (let iconName in ElIconModules) {
      // @ts-ignore
      app.component(iconName, ElIconModules[iconName])
    }
  }
}

export default componentInstall
