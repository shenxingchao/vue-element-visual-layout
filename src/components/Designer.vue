<template>
  <el-container style="height:calc(100vh - 40px);">
    <el-main @dragenter="handleDragEnter" @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop">
      <!-- 使用递归组件 -->
      <component-tree :component_tree_list="component_tree_list"></component-tree>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
//导入公共方法
import mixins from '@/mixins/index'
//导入递归组件树
import ComponentTree from '@/components/ComponentTree.vue'

export default defineComponent({
  name: 'Designer',
  components: {
    ComponentTree,
  },
  setup() {
    const store = useStore()

    //递归删除旧的占位块
    const { _handleRecursionDelete } = mixins()

    //数据对象
    let data: any = reactive({
      component_tree_list: store.state.component_tree_list, //组件树
      insert_index: 0, //当前控件插入位置索引
    })

    //被拖动元素进入到释放区所占据得屏幕空间时触发
    const handleDragEnter = (e: any) => {
      console.log('2.控件进入最外层主窗口触发 handleDragEnter')
    }

    //当被拖动元素在释放区内移动或停留时触发
    const handleDragOver = (e: any) => {
      e.preventDefault()
      console.log('3.控件在最外层主窗口移动或停留时触发 handleDragOver')

      let flag_position = false //有没有找到元素所在位置标志

      //循环第一层的元素 判断该当前鼠标位置在对应水平线元素的中线上面还是下面，上面就在上面插入占位块，下面就在下面插入占位块
      for (let i = 0; i < data.component_tree_list.length; i++) {
        const node = data.component_tree_list[i]
        const ele = document.getElementById(node.id) as HTMLElement
        if (i == 0 && e.clientY < ele.offsetTop) {
          //在第一个的上面，插入到最前面
          flag_position = true
          data.insert_index = 0
          break
        } else if (
          e.clientY >= ele.offsetTop &&
          e.clientY < ele.offsetTop + ele.offsetHeight / 2
        ) {
          //在当前元素的水平中线上面
          flag_position = true
          data.insert_index = i
          break
        } else if (
          e.clientY >= ele.offsetTop + ele.offsetHeight / 2 &&
          e.clientY < ele.offsetTop + ele.offsetHeight
        ) {
          //在当前元素的水平中线下面
          flag_position = true
          data.insert_index = i + 1
          break
        } else if (i == data.component_tree_list.length - 1 && !flag_position) {
          //在最后一个的下面，插入的最后面
          data.insert_index = i + 1
          break
        }
      }
      //递归删除所有占位块
      _handleRecursionDelete(data.component_tree_list)
      //生成一个占位块
      let block_node: any = {
        id: 'block_node',
        title: '占位块',
        name: 'el-row',
        props: {},
        style: 'width:100%;height:100px;background:green;border:none;',
      }
      //插入到指定位置
      data.component_tree_list.splice(data.insert_index, 0, block_node)
    }

    //当被拖动元素没有放下就离开释放区时触发
    const handleDragLeave = (e: any) => {
      console.log('4.控件移出最外层主窗口触发 handleDragLeave')
    }

    //当被拖动元素在释放区里放下时触发
    const handleDrop = (e: any) => {
      e.preventDefault()
      console.log('5.控件在最外层释放区放下 handleDrop')
      //删除占位块
      _handleRecursionDelete(data.component_tree_list)
      //插入到指定位置
      data.component_tree_list.splice(
        data.insert_index,
        0,
        JSON.parse(e.dataTransfer.getData('node'))
      )
    }

    return {
      ...toRefs(data),
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    }
  },
})
</script>
