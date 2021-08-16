<template>
  <el-container style="height:calc(100vh - 40px);">
    <el-main id="right" @dragenter="handleDragEnter" @dragover="handleDragOver" @dragleave="handleDragLeave"
             @drop="handleDrop">
      <!-- 使用递归组件 -->
      <component-tree :component_tree_list="component_tree_list"></component-tree>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
//导入递归组件树
import ComponentTree from '@/components/ComponentTree.vue'

export default defineComponent({
  name: 'Designer',
  components: {
    ComponentTree,
  },
  mounted() {},
  setup() {
    const store = useStore()

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
      //插入到指定位置
      // data.component_tree_list.splice(data.insert_index, 0, block_node)
    }

    //当被拖动元素没有放下就离开释放区时触发
    const handleDragLeave = (e: any) => {
      console.log('4.控件移出最外层主窗口触发 handleDragLeave')
    }

    //当被拖动元素在释放区里放下时触发
    const handleDrop = (e: any) => {
      e.preventDefault()
      console.log('5.控件在最外层释放区放下 handleDrop')

      //插入到指定位置
      // data.component_tree_list.splice(
      //   data.insert_index,
      //   0,
      //   JSON.parse(e.dataTransfer.getData('node'))
      // )
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
