# 欢迎使用 vue-element-visual-layout
**基于vue3 + electron13 + element-plus 开发的可视化拖动布局工具**  
![calc](https://img.shields.io/badge/version-1.0.5-COLOR)  ![calc](https://img.shields.io/badge/-vue3-red) ![calc](https://img.shields.io/badge/-elementPlus-blue) ![calc](https://img.shields.io/badge/-electron13-yellow)
## 更新日志
**v1.0.5**
- 1.实现组件上右键显示组件及其所有父级组件列表的右键菜单

**v1.0.4**
- 1.实现设计窗口内任意拖动
- 2.解决移动过快占位块出现问题
- 3.判断是否是设计窗口内,上拖还是下拖 还是控件栏拖入 计算插入的索引
- 4.禁止拖入自身
- 5.修复拖动时占位块还未渲染完成，就去取索引，取不到的问题
- 6.鼠标移入组件边框滞留问题
- 7.修复复制节点的id生成错误
- 8.解决复制粘贴冲突问题
- 9.修复边界拖动问题，这样就可以任意换顺序了

**v1.0.3**
- 1.边界拖动处理
- 2.添加控件是否允许被拖入
- 3.组件树拖入判断
- 4.隐藏el-radio el-checkbox el-option 在节点树中的显示

**v1.0.2**
- 剪切控件快捷键功能
- 鼠标移入节点树对应控件高亮
- 修复快捷键监听和浏览器默认复制剪切粘贴冲突 
- 新增描述列表控件
- 鼠标点击节点树 图标不能缩放问题

**v1.0.1**
- 优化左侧控件栏显示
- 打开默认主题色
- 优化部分主题色
- class="el-icon-*"类 全部替换成自定义svg-icon组件
- 修复复制节点生成的id问题

**v1.0.0**
- 栅格布局拖拽
- 表单控件拖拽
- 设计窗口代码分离显示
- 控件单个属性
- 节点树
- 设计边框线
- 控件复制粘贴功能
- 控件删除功能
- 自定义主题

## 如何使用

**客户端**
[下载 v1.0.5](https://github.com/shenxingchao/vue-element-visual-layout/releases/tag/v1.0.5)  
[下载 v1.0.3](https://github.com/shenxingchao/vue-element-visual-layout/releases/tag/v1.0.3)  
[下载 v1.0.2](https://github.com/shenxingchao/vue-element-visual-layout/releases/tag/v1.0.2)  
[下载 v1.0.1](https://github.com/shenxingchao/vue-element-visual-layout/releases/tag/v1.0.1)  
[下载 v1.0.0](https://github.com/shenxingchao/vue-element-visual-layout/releases/tag/v1.0.1)  

**网页版**

[在线使用最新版v1.0.5](https://shenxingchao.github.io/vue-element-visual-layout/#/)  
[衍生产品](https://shenxingchao.github.io/vue3-visual-cms/admin#/design?id=1)  
账号密码随便输 暂不提供源码

**创建栅格布局**

![calc](./images/row-col.gif)  
[查看大图](https://github.com/shenxingchao/vue-element-visual-layout/blob/master/images/row-col.gif)

**创建表单**

![calc](./images/form.gif)  
[查看大图](https://github.com/shenxingchao/vue-element-visual-layout/blob/master/images/form.gif)

**快捷键**

| 快捷键 | 功能                                                   |
| ------ | ------------------------------------------------------ |
| DELETE | 删除选中控件及其子控件                                 |
| CTRL+C | 复制选中控件                                           |
| CTRL+V | 粘贴复制的控件到选中控件的子控件中或者粘贴到最外层控件 |
| CTRL+X | 剪切控件及其子控件                                     |

**工具栏**

功能按工具栏按钮顺序
- 设计窗口/切换显示边框
- 查看代码
- 清空布局
- 删除选中的控件 DELETE

**拖拽**
- 属性栏切换到节点树选项卡下，拖动节点即可完成控件之间的位置交换
- 左侧控件栏拖到设计窗口时，最外层控件可排序

**主题**
- 右上角设置按钮下可切换界面主题色

## 下载代码
```git
git clone https://github.com/shenxingchao/vue-element-visual-layout.git
```

## 基于web开发
切换到 vue-web 分支

**使用npm**
```shell
npm run serve
npm run build
```

**使用yarn**
```shell
yarn serve
yarn build
```

## 基于electron开发

**使用npm**
```shell
npm install
npm run electron:serve
npm run electron:build
```

**使用yarn**
```shell
yarn
yarn electron:serve
yarn electron:build
```

> 免费使用！！其他有问题的地方欢迎提问，需要其他功能的可以提出来，酌情增加