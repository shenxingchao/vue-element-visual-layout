<template>
  <!-- 递归循环渲染组件树 -->
  <template v-for="(node, index) in component_tree_list" :key="node.id + index">
    <component :id="node.id" :is="node.name" v-bind="node.props" :style="node.style">
      {{node.title}}
      id:{{node.id}}
      <template v-if="node.children">
        <component-tree :component_tree_list="node.children"></component-tree>
      </template>
    </component>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ComponentTree',
  props: {
    //表格数据
    component_tree_list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  //组件发出的事件需要定义
  emits: ['handleChangeComponentTreeList'],
  setup(props, { emit }) {
    const store = useStore()

    //数据对象
    let data: any = reactive({
      sotre_component_tree_list: store.state.component_tree_list, //组件树
    })

    //被拖动元素进入到释放区所占据得屏幕空间时触发
    const handleDragEnterOnNode = (e: any) => {
      console.log('6.控件进入子控件触发 handleDragEnterOnNode')
    }

    //当被拖动元素在释放区内移动时触发
    const handleDragOverOnNode = (node: any, e: any) => {
      console.log('8.控件在子控件移动或停留时触发 handleDragOverOnNode')
    }

    //当被拖动元素在节点上释放时
    const handleDropOnNode = (node: any, e: any) => {
      //删除之前的占位块
      console.log('9.控件在子控件上释放时触发 handleDropOnNode')
    }

    return {
      handleDragEnterOnNode,
      handleDragOverOnNode,
      handleDropOnNode,
    }
  },
})
</script>
<style lang="scss" scoped>
.el-row,
.el-container,
[class*='el-col-'] {
  padding: 20px 0;
  border: 1px solid red;
}
</style>