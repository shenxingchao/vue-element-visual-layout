<template>
  <!-- 递归循环渲染组件树 -->
  <template v-for="(node, index) in component_tree_list" :key="node.id + index">
    <!-- 日期控件加属性和选择有问题单独处理 -->
    <template v-if="node.name =='el-date-picker'">
      <div style="display:inline-block;" :id="node.id" :class="handleShowBorder(node)" :draggable="false"
           @dragenter.stop.prevent="handleDragEnterOnNode" @dragover.stop.prevent="handleDragOverOnNode(node,$event)"
           @drop.stop.prevent="handleDropOnNode(node, $event)" @click.stop.prevent="handleClick">
        <component :is="node.name" v-model="node.value" :type="node.props.type" :readonly="node.props.readonly"
                   :disabled="node.props.disabled" :editable="node.props.editable" :clearable="node.props.clearable"
                   :placeholder="node.props.placeholder" :start-placeholder="node.props['start-placeholder']"
                   :end-placeholder="node.props['end-placeholder']" :range-separator="node.props['range-separator']"
                   :style="node.style">
          {{node.text}}
          <template v-if="node.children">
            <component-tree :component_tree_list="node.children"></component-tree>
          </template>
        </component>
      </div>
    </template>
    <!-- 其他控件没问题 -->
    <template v-else>
      <component :id="node.id" :is="node.name" v-bind="node.props" v-model="node.value" :class="handleShowBorder(node)"
                 :style="node.style" :draggable="false" @dragenter.stop.prevent="handleDragEnterOnNode"
                 @dragover.stop.prevent="handleDragOverOnNode(node,$event)"
                 @drop.stop.prevent="handleDropOnNode(node, $event)" @click.stop.prevent="handleClick">
        {{node.text}}
        <template v-if="node.children">
          <component-tree :component_tree_list="node.children"></component-tree>
        </template>
      </component>
    </template>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, toRefs } from 'vue'
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
      show_border: true, //是否显示边框线
    })

    const {
      _handleRecursionDelete, //递归删除旧的占位块
      _handleRecursionGetParentNode, //递归查找父级节点
      _handleRecursionGetNodeByNodeId, //递归根据节点id查找节点信息
    } = mixins()

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
            'flex-grow: 1;height:100%;max-height:80px;border:1px dashed #cccccc;box-sizing:border-box;background:#fafafa;',
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

    //是否显示边框线
    const handleShowBorder = (node: any) => {
      let white_list = [
        'el-container',
        'el-row',
        'el-col',
        'el-form',
        'el-form-item',
      ]

      if (white_list.includes(node.name) && store.state.show_border) {
        return 'padding'
      } else {
        return ''
      }
    }

    const handleClick = (e: any) => {
      //递归找id 这里可能点了内部的文字所以要递归找
      const recursionFindNodeId: any = (e: any, level: number = 0) => {
        if (e.target && e.target.id) {
          return e.target.id
        } else if (e.id) {
          return e.id
        } else if (level > 3) {
          //找4层 后返回
          return false
        } else {
          //如果是点击了内部的文字则往上找id
          level++
          return recursionFindNodeId(
            e.target ? e.target.parentElement : e.parentElement,
            level
          )
        }
      }

      let target_id = recursionFindNodeId(e)

      if (e.target.className == 'el-switch__core') {
        //如果是开关控件，则是找到他的兄弟节点
        target_id = e.target.parentNode.children[0].id
      } else if (e.target.className == 'el-select__tags') {
        //如果是多选下拉框，则找到他兄弟节点的子节点
        target_id = e.target.parentNode.children[1].children[0].id
      }

      //选中高亮区域
      if (target_id) {
        let node_info: any = _handleRecursionGetNodeByNodeId(
          target_id,
          data.sotre_component_tree_list
        )
        //设置当前操作对象
        store.dispatch('handleChangeCurrentNodeInfo', node_info)
        //清除高亮边框
        let border = document.getElementsByClassName('border')[0] as HTMLElement
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
    }

    return {
      ...toRefs(data),
      handleDragEnterOnNode,
      handleDragOverOnNode,
      handleDropOnNode,
      handleShowBorder,
      handleClick,
    }
  },
})
</script>
<style lang="scss" scoped>
.padding {
  padding: 20px 20px;
  border: 1px dashed #cccccc;
  box-sizing: border-box;
}
.border {
  border: 1px dashed $theme;
}
</style>