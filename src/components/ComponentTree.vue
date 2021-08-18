<template>
  <!-- 递归循环渲染组件树 -->
  <template v-for="(node, index) in component_tree_list" :key="node.id + index">
    <component :id="node.id" :is="node.name" v-bind="node.props" :style="node.style" :draggable="false"
               @dragenter.stop.prevent="handleDragEnterOnNode"
               @dragover.stop.prevent="handleDragOverOnNode(node,$event)"
               @drop.stop.prevent="handleDropOnNode(node, $event)">
      <template v-if="node.children">
        <component-tree :component_tree_list="node.children"></component-tree>
      </template>
    </component>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

//导入公共方法
import mixins from '@/mixins/index'

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
  setup(props, { emit }) {
    const store = useStore()

    //当前组件实例
    const internalInstance = getCurrentInstance()

    //访问 globalProperties
    const global: any = internalInstance?.appContext.config.globalProperties

    //数据对象
    let data: any = reactive({
      sotre_component_tree_list: store.state.component_tree_list, //组件树
    })

    //递归删除旧的占位块,递归查找父级节点
    const { _handleRecursionDelete, _handleRecursionGetParentNode } = mixins()

    //被拖动元素进入到释放区所占据得屏幕空间时触发  console.log('6.控件进入子控件触发 handleDragEnterOnNode')
    const handleDragEnterOnNode = (e: any) => {}

    //当被拖动元素在释放区内移动时触发   console.log('7.控件进入子控件触发 handleDragOverOnNode')
    const handleDragOverOnNode = (node: any, e: any) => {
      //如果是在占位块上移动，则算是在他父级上移动,且占位块不发生任何变化
      let parent_node: any = null
      if (node.id == 'block_node') {
        parent_node = _handleRecursionGetParentNode(
          node,
          data.sotre_component_tree_list
        )
        node = parent_node
      }

      //如果没有父级说明不是在占位块上移动，则删除占位块并重新生成
      if (!parent_node) {
        //删除之前的占位块
        _handleRecursionDelete('block_node', data.sotre_component_tree_list)
        //生成一个占位块
        let block_node: any = {
          id: 'block_node',
          title: '占位块',
          name: 'el-row',
          props: {},
          style:
            'width:100%;height:100px;border:1px dashed #cccccc;box-sizing:border-box;background:#fafafa;',
        }

        //插入到元素内部
        if (node.children) {
          node.children.push(block_node)
        } else {
          //说明是在最外层 添加占位块
          node.push(block_node)
        }
      }
    }

    //当被拖动元素在节点上释放时
    const handleDropOnNode = (node: any, e: any) => {
      if (node.id == 'block_node') {
        //如果是在占位块上释放，则算是在他父级上释放
        let parent_node = _handleRecursionGetParentNode(
          node,
          props.component_tree_list
        )
        node = parent_node
      }

      //删除之前的占位块 要在找父级之后，不然占位块都没了，怎么找父级
      _handleRecursionDelete('block_node', data.sotre_component_tree_list)

      //获取拖动数据
      let node_info: any = JSON.parse(e.dataTransfer.getData('node'))

      if (node.children) {
        //添加到子控件
        node.children.push(node_info)
      } else {
        //放入最外层数组或者是子控件的children数组里面
        node.push(node_info)
      }
      //设置当前操作对象
      store.dispatch('handleChangeCurrentNodeInfo', node_info)
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
  border: 1px dashed #cccccc;
}
.border {
  border: 1px solid $theme;
}
</style>