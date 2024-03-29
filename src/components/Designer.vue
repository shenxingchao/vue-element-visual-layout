<template>
  <el-container style="height:calc(100vh - 40px);background-color: rgb(255, 255, 255);">
    <el-container class="designer-container" style="flex-direction: column;">
      <tool-bar @handleChangeDesigner="handleChangeDesigner" @handleClearLayout="handleClearLayout"
                @handleDeleteControl="handleDeleteControl"> </tool-bar>
      <el-main id="desginer" v-if="tab_index == 1" @dragenter="handleDragEnter" @dragover="handleDragOver"
               @dragleave="handleDragLeave" @drop="handleDrop" @click="handleClick">
        <!-- 使用递归组件 -->
        <component-tree :component_tree_list="component_tree_list"></component-tree>
      </el-main>
      <el-main v-if="tab_index == 2" v-highlightjs>
        <h5 v-if="code!=''">html</h5>
        <pre v-if="code!=''"><code class="language-html" contenteditable="true">{{code}}</code></pre>
      </el-main>
      <ul v-show="content_node_list.length > 0" class="contextmenu"
          :style="{left:content_location.x+'px',top:content_location.y+'px'}">
        <li v-for="(item,index) in content_node_list" :key="index" @click="handleClickContentMenuItem(item)"
            @mouseover="handleMouseOverContentMenuItem(item)" @mouseout="handleMouseOutContentMenuItem(item)">
          {{item.title}}
        </li>
      </ul>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  nextTick,
  onMounted,
  ref,
  computed,
  watch,
} from 'vue'
import { useStore } from 'vuex'
//导入公共方法
import mixins from '@/mixins/index'
//导入递归组件树
import ComponentTree from '@/components/ComponentTree.vue'
//导入工具栏
import ToolBar from '@/components/ToolBar.vue'
import store from '@/store'

export default defineComponent({
  name: 'Designer',
  components: {
    ComponentTree,
    ToolBar,
  },
  setup() {
    const store = useStore()

    const {
      _handleRecursionDelete, //递归删除旧的占位块
      _generateCode, //递归生成代码
    } = mixins()

    //计算属性
    const set: any = reactive({
      //右键菜单位置
      content_location: computed({
        get() {
          return store.state.content_location
        },
        set(val) {},
      }),
      //右键菜单
      content_node_list: computed({
        get() {
          return store.state.content_node_list
        },
        set(val) {},
      }),
    })

    watch(toRefs(set).content_node_list, (val) => {
      if (val.length > 0) {
        document.body.addEventListener('click', () => {
          //点击的是不同位置   清除list
          store.dispatch('handleChangeContentNodeList', [])
          //记录点击位置
          store.dispatch('handleChangeContentLocation', {
            x: null,
            y: null,
          })
        })
      }
    })

    //数据对象
    let data: any = reactive({
      tab_index: 1, //页面内容 1界面设计 2查看代码
      component_tree_list: store.state.component_tree_list, //组件树
      insert_index: 0, //当前控件插入位置索引
      code: '', //根据组件树生成的代码
    })

    //挂载事件
    onMounted(() => {
      //监听 键盘按下事件
      document.onkeydown = function (event: any) {
        var e = event || window.event || arguments.callee.caller.arguments[0]

        if (e && e.keyCode == 46) {
          // 按下DELETE 删除控件
          handleDeleteControl()
        }

        if (e.ctrlKey && e.keyCode == 67) {
          //ctrl+c 复制节点
          //判断是否是浏览器默认快捷键 原理：判断是否选中了内容
          let content = (<any>window).getSelection().toString()
          if (!content) {
            //不是系统快捷键
            //复制控件
            handleCopyControl()
            e.preventDefault()
          }
        }

        if (e.ctrlKey && e.keyCode == 88) {
          //ctrl+x 剪切节点 先复制后删除
          //判断是否是浏览器默认快捷键 原理：判断是否选中了内容
          let content = (<any>window).getSelection().toString()
          if (!content) {
            //不是系统快捷键
            handleCopyControl()
            handleDeleteControl()
          }
        }

        if (e.ctrlKey && e.keyCode == 86) {
          //ctrl+v 粘贴节点
          if (
            (document.activeElement as HTMLElement).tagName != 'INPUT' &&
            (document.activeElement as HTMLElement).tagName != 'TEXTAREA'
          ) {
            handlePasteControl()
            e.preventDefault()
          }
        }
      }
    })

    //被拖动元素进入到释放区所占据得屏幕空间时触发 console.log('2.控件进入最外层主窗口触发 handleDragEnter')
    const handleDragEnter = (e: any) => {}

    //当被拖动元素在释放区内移动或停留时触发 console.log('3.控件在最外层主窗口移动或停留时触发 handleDragOver')
    const handleDragOver = (e: any) => {
      e.preventDefault()

      let flag_position = false //有没有找到元素所在位置标志
      let mouse_absolute__y =
        e.clientY +
        (document.getElementById('desginer') as HTMLElement).scrollTop //鼠标在设计窗口的绝对位置

      //循环第一层的元素 判断该当前鼠标位置在对应水平线元素的中线上面还是下面，上面就在上面插入占位块，下面就在下面插入占位块
      for (let i = 0; i < data.component_tree_list.length; i++) {
        const node = data.component_tree_list[i]
        const ele = document.getElementById(node.id) as HTMLElement
        if (i == 0 && mouse_absolute__y < ele.offsetTop) {
          //在第一个的上面，插入到最前面
          flag_position = true
          data.insert_index = 0
          break
        } else if (mouse_absolute__y < ele.offsetTop + ele.offsetHeight / 2) {
          //在当前元素的水平中线上面
          flag_position = true
          data.insert_index = i
          break
        } else if (i == data.component_tree_list.length - 1 && !flag_position) {
          //在最后一个的下面，插入的最后面
          data.insert_index = i + 1
          break
        }
      }

      //递归删除所有占位块
      _handleRecursionDelete('block_node', data.component_tree_list)

      //生成一个占位块
      let block_node: any = {
        id: 'block_node',
        title: '',
        name: 'el-row',
        props: {},
        style:
          'flex: 1;border:1px dashed #cccccc;box-sizing:border-box;background:#fafafa;',
      }

      //插入到指定位置
      data.component_tree_list.splice(data.insert_index, 0, block_node)
    }

    //当被拖动元素没有放下就离开释放区时触发       console.log('4.控件移出最外层主窗口触发 handleDragLeave')
    const handleDragLeave = (e: any) => {}

    //当被拖动元素在释放区里放下时触发       console.log('5.控件在最外层释放区放下 handleDrop')
    const handleDrop = (e: any) => {
      e.preventDefault()

      //删除占位块
      _handleRecursionDelete('block_node', data.component_tree_list)

      //获取拖动数据
      let node_info: any = JSON.parse(e.dataTransfer.getData('node'))

      //删除旧节点
      _deleteOldNodeInfo()

      //插入到指定位置
      data.component_tree_list.splice(data.insert_index, 0, node_info)

      //设置当前操作对象
      store.dispatch('handleChangeCurrentNodeInfo', node_info)
    }

    //点击main
    const handleClick = (e: any) => {
      //点击空白区域
      if (e.target.className == 'el-main') {
        //清除高亮边框
        let border = document.getElementsByClassName('border')[0] as HTMLElement
        if (border) {
          border.className = border.className.replace(' border', '')
        }
        //隐藏属性栏 设置当前操作对象
        store.dispatch('handleChangeCurrentNodeInfo', { props: {} })
      }
    }

    //改变主设计窗口显示内容
    const handleChangeDesigner = (val: number) => {
      //切换显示内容索引
      data.tab_index = val

      if (val == 2) {
        //隐藏属性栏 设置当前操作对象 暂时先隐藏
        store.dispatch('handleChangeCurrentNodeInfo', { props: {} })
        //递归生成代码
        data.code = _generateCode(store.state.component_tree_list)
      }
    }

    //清空布局
    const handleClearLayout = () => {
      store.dispatch('handleChangeCurrentNodeInfo', { props: {} })

      //这里主要响应对象不能直接赋值[] 会使其响应性失效
      data.component_tree_list.splice(0, data.component_tree_list.length)
    }

    //删除控件
    const handleDeleteControl = () => {
      if (store.state.current_node_info.id) {
        //递归删除节点及其子节点
        _handleRecursionDelete(
          store.state.current_node_info.id,
          data.component_tree_list
        )
        //隐藏属性栏 设置当前操作对象
        store.dispatch('handleChangeCurrentNodeInfo', { props: {} })
      }
    }

    //复制控件
    const handleCopyControl = () => {
      if (Object.keys(store.state.current_node_info.props).length > 0) {
        //如果当前选中节点
        let copy_node_info = JSON.parse(
          JSON.stringify(store.state.current_node_info)
        )
        store.dispatch('handleChangeCopyNodeInfo', copy_node_info)
      }
    }

    const handlePasteControl = () => {
      if (Object.keys(store.state.copy_node_info).length > 0) {
        //如果有复制节点
        let copy_node_info = JSON.parse(
          JSON.stringify(store.state.copy_node_info)
        )
        //白名单 只要在这里面的节点 循环的时候子级的id和父级的相同即可 这样选中子级的时候就等同于选择了父级
        let white_list = [
          'el-radio-group',
          'el-checkbox-group',
          'el-select',
          'el-descriptions',
        ]
        //递归所有children重新生成id方法
        let recursionGenerateNode = (node: any, level: number = 0) => {
          node.id = 'node-' + new Date().getTime() + level
          if (node.children && node.children.length > 0) {
            node.children.forEach((element: any) => {
              if (!white_list.includes(node.name)) {
                //不在白名单里的控件id需要加1
                level++
              }
              recursionGenerateNode(element, level)
              //循环完成还得增加以下，不然这次循环和上次循环的id一样了
              level++
            })
          }
          return node
        }
        copy_node_info = recursionGenerateNode(copy_node_info) //递归所有children重新生成id，保证粘贴的都是不一样的元素，不然粘贴的元素就和前面的一样啦
        store.dispatch('handleChangeCopyNodeInfo', copy_node_info)
        if (Object.keys(store.state.current_node_info.props).length > 0) {
          //放到选中的控件children中
          store.state.current_node_info.children.push(
            store.state.copy_node_info
          )
        } else {
          //放到最外层
          store.state.component_tree_list.push(store.state.copy_node_info)
        }
      }
    }

    //设计窗口内拖拽删除旧节点方法
    const _deleteOldNodeInfo = () => {
      //判断是否是设计窗口内控件拖拽
      if (Object.keys(store.state.drag_node_info).length > 0) {
        //删除之前的控件
        _handleRecursionDelete(
          store.state.drag_node_info.id,
          data.component_tree_list
        )
        //设置当前拖动对象
        store.dispatch('handleChangeDragNodeInfo', {})
      }
    }

    //点击右键菜单选项
    const handleClickContentMenuItem = (node_info: any) => {
      //设置当前操作对象
      store.dispatch('handleChangeCurrentNodeInfo', node_info)
      //清除高亮边框
      let border = document.getElementsByClassName(
        'hover-border'
      )[0] as HTMLElement
      if (border) {
        border.className = border.className.replace(' hover-border', '')
      }
      //清除高亮边框
      border = document.getElementsByClassName('border')[0] as HTMLElement
      if (border) {
        border.className = border.className.replace(' border', '')
      }
      //高亮控件边框
      let node_element = document.getElementById(
        store.state.current_node_info.id
      ) as HTMLElement
      if (node_element) {
        node_element.className = node_element.className + ' border'
      }
    }

    //鼠标移入右键菜单选项
    const handleMouseOverContentMenuItem = (node_info: any) => {
      //高亮控件边框
      let node_element = document.getElementById(node_info.id) as HTMLElement
      if (node_element) {
        node_element.className = node_element.className + ' hover-border'
      }
    }
    //鼠标移出右键菜单选项
    const handleMouseOutContentMenuItem = (node_info: any) => {
      //清除高亮边框
      let border = document.getElementsByClassName(
        'hover-border'
      )[0] as HTMLElement
      if (border) {
        border.className = border.className.replace(' hover-border', '')
      }
    }

    return {
      ...toRefs(data),
      ...toRefs(set),
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleClick,
      handleChangeDesigner,
      handleClearLayout,
      handleDeleteControl,
      handleCopyControl,
      handlePasteControl,
      handleClickContentMenuItem,
      handleMouseOverContentMenuItem,
      handleMouseOutContentMenuItem,
    }
  },
})
</script>
<style lang="scss" scoped>
.designer-container {
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>