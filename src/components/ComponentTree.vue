<template>
  <!-- 递归循环渲染组件树 -->
  <template v-for="(node, index) in component_tree_list" :key="node.id + index">
    <!-- 日期控件加属性和选择有问题单独处理 -->
    <template v-if="node.name =='el-date-picker'">
      <div style="display:inline-block;" :id="node.id" :class="handleShowBorder(node)" :draggable="true"
           @dragstart.stop="handleDragStart(node,$event)" @dragend="handleDragEnd"
           @dragenter.stop.prevent="handleDragEnterOnNode" @dragover.stop.prevent="handleDragOverOnNode(node,$event)"
           @drop.stop.prevent="handleDropOnNode(node, $event)" @click.stop.prevent="handleClick">
        <component :is="node.name" v-model="node.value" :type="node.props.type" :readonly="node.props.readonly"
                   :disabled="node.props.disabled" :editable="node.props.editable" :clearable="node.props.clearable"
                   :placeholder="node.props.placeholder" :start-placeholder="node.props['start-placeholder']"
                   :end-placeholder="node.props['end-placeholder']" :range-separator="node.props['range-separator']"
                   :style="node.style">
        </component>
      </div>
    </template>
    <!-- 描述列表渲染子级有bug目前无法解决 单独处理-->
    <template v-else-if="node.name == 'el-descriptions'">
      <component :id="node.id" :is="node.name" v-bind="node.props" v-model="node.value" :class="handleShowBorder(node)"
                 :style="node.style" :draggable="true" @dragstart.stop="handleDragStart(node,$event)"
                 @dragend="handleDragEnd" @dragenter.stop.prevent="handleDragEnterOnNode"
                 @dragover.stop.prevent="handleDragOverOnNode(node,$event)"
                 @drop.stop.prevent="handleDropOnNode(node, $event)" @click.stop.prevent="handleClick">
        <template v-for="(node, index) in node.children" :key="node.id + index">
          <component :id="node.id" :is="node.name" v-bind="node.props" v-model="node.value"
                     :class="handleShowBorder(node)" :style="node.style" :draggable="true"
                     @dragstart.stop="handleDragStart(node,$event)" @dragend="handleDragEnd"
                     @dragenter.stop.prevent="handleDragEnterOnNode"
                     @dragover.stop.prevent="handleDragOverOnNode(node,$event)"
                     @drop.stop.prevent="handleDropOnNode(node, $event)" @click.stop.prevent="handleClick">
            {{node.text}}
            <template v-if="node.children">
              <component-tree :component_tree_list="node.children"></component-tree>
            </template>
          </component>
        </template>
      </component>
    </template>
    <!-- 其他控件没问题 -->
    <template v-else>
      <component :id="node.id" :is="node.name" v-bind="node.props" v-model="node.value" :class="handleShowBorder(node)"
                 :style="node.style" :draggable="true" @dragstart.stop="handleDragStart(node,$event)"
                 @dragend="handleDragEnd" @dragenter.stop.prevent="handleDragEnterOnNode"
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
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  toRefs,
  nextTick,
} from 'vue'
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
    const { proxy } = getCurrentInstance() as any

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
            'flex: 1;border:1px dashed #cccccc;box-sizing:border-box;background:#fafafa;',
        }

        //插入到元素内部
        if (node.children) {
          //判断是否是在最外层的边界，如果在最外层的边界移动，那么插入到对应的最外层索引后
          const ele = document.getElementById(node.id) as HTMLElement

          //落在边界还是内部 边界的话可以换顺序 内部的话直接扔进去
          let position_type = 0 //0内部 1上下边界 2左右边界
          //这里>=2和<=2是为了放大边界，不然会有bug
          if (
            e.clientY +
              (document.getElementById('desginer') as HTMLElement).scrollTop >=
              _recursionGetOffsetTop(ele).offsetTop - 2 &&
            e.clientY +
              (document.getElementById('desginer') as HTMLElement).scrollTop <=
              _recursionGetOffsetTop(ele).offsetTop + 2
          ) {
            //落在上下边界上
            position_type = 1
          } else if (
            e.clientX +
              (document.getElementById('desginer') as HTMLElement).scrollLeft >=
              _recursionGetOffsetTop(ele).offsetLeft - 2 &&
            e.clientX +
              (document.getElementById('desginer') as HTMLElement).scrollLeft <=
              _recursionGetOffsetTop(ele).offsetLeft + 2
          ) {
            //落在左右边界上 获取当前元素的父级
            position_type = 2
          } else {
            //落在内部
            position_type = 0
          }
          //根据落在哪里的类型插入元素
          if (position_type == 1 || position_type == 2) {
            //落在上下边界上 获取当前元素的父级
            parent_node = _handleRecursionGetParentNode(
              node,
              data.sotre_component_tree_list
            )
            if (parent_node.children) {
              //说明在内 二层及以上
              parent_node = parent_node.children
            }
            //当前鼠标所在元素边界元素索引
            let index = 0
            for (let i = 0; i < parent_node.length; i++) {
              const child = parent_node[i]
              if (child.id == node.id) {
                index = i
                break
              }
            }
            parent_node.splice(index, 0, block_node)
          } else {
            //插入到内部
            node.children.push(block_node)
          }
        } else {
          //说明是在最外层 添加占位块
          node.push(block_node)
        }
      }
    }

    //当被拖动元素在节点上释放时
    const handleDropOnNode = (node: any, e: any) => {
      nextTick(() => {
        //当前元素的父节点
        let parent_node: any = null
        //占位块的父节点
        let block_parent_node: any = null
        //是否放在内层的占位块上 占位块的索引
        let block_node_index = 0
        //是否放在内层的占位块上
        let is_block_node_release = false
        if (node.id == 'block_node') {
          //如果是在占位块上释放，则算是在他父级上释放
          parent_node = _handleRecursionGetParentNode(
            node,
            data.sotre_component_tree_list
          )
          //直接找到占位块释放的索引index start
          is_block_node_release = true
          block_parent_node = parent_node.children
            ? parent_node.children
            : parent_node
          for (let i = 0; i < block_parent_node.length; i++) {
            const child = block_parent_node[i]
            if (child.id == node.id) {
              block_node_index = i
              //判断是否是设计窗口内上拖还是下拖 还是控件栏拖入 计算插入的索引
              block_node_index = _handleCalcDragInsertIndex(
                block_node_index,
                parent_node
              )
              break
            }
          }
          //直接找到占位块释放的index end
          node = parent_node
        }

        //删除之前的占位块 要在找父级之后，不然占位块都没了，怎么找父级  必须要删掉 不然会闪一下
        _handleRecursionDelete('block_node', data.sotre_component_tree_list)

        //获取拖动数据
        let node_info: any = JSON.parse(e.dataTransfer.getData('node'))

        if (is_block_node_release) {
          if (parent_node.children) {
            if (node.allow) {
              //判断是否是自己拖到自己
              if (node.id == node_info.id) {
                proxy.$message({
                  message: '禁止拖入自身',
                  type: 'warning',
                })
                return false
              }
              //删除旧节点
              _deleteOldNodeInfo()
              //插入到内部
              parent_node.children.splice(block_node_index, 0, node_info)
            } else {
              node_info = { props: {} }
            }
          } else {
            //删除旧节点
            _deleteOldNodeInfo()
            //最外层
            parent_node.splice(block_node_index, 0, node_info)
          }

          //设置当前操作对象
          store.dispatch('handleChangeCurrentNodeInfo', node_info)
          return
        }

        if (node.children) {
          //判断是否是在最外层的边界，如果在最外层的边界移动，那么插入到对应的最外层索引后
          const ele = document.getElementById(node.id) as HTMLElement
          //落在边界还是内部 边界的话可以换顺序 内部的话直接扔进去
          let position_type = 0 //0内部 1上下边界 2左右边界
          //这里>=2和<=2是为了放大边界，不然会有bug
          if (
            e.clientY +
              (document.getElementById('desginer') as HTMLElement).scrollTop >=
              _recursionGetOffsetTop(ele).offsetTop - 2 &&
            e.clientY +
              (document.getElementById('desginer') as HTMLElement).scrollTop <=
              _recursionGetOffsetTop(ele).offsetTop + 2
          ) {
            //落在上下边界上
            position_type = 1
          } else if (
            e.clientX +
              (document.getElementById('desginer') as HTMLElement).scrollLeft >=
              _recursionGetOffsetTop(ele).offsetLeft - 2 &&
            e.clientX +
              (document.getElementById('desginer') as HTMLElement).scrollLeft <=
              _recursionGetOffsetTop(ele).offsetLeft + 2
          ) {
            //落在左右边界上 获取当前元素的父级
            position_type = 2
          } else {
            //落在内部
            position_type = 0
          }
          //同样放大边界
          if (position_type == 1 || position_type == 2) {
            //落在边界上 获取当前元素的父级
            parent_node = _handleRecursionGetParentNode(
              node,
              data.sotre_component_tree_list
            )
            if (parent_node.children) {
              //说明在内 二层及以上
              parent_node = parent_node.children
            }
            //当前鼠标所在元素边界元素索引
            let index = 0
            for (let i = 0; i < parent_node.length; i++) {
              const child = parent_node[i]
              if (child.id == node.id) {
                index = i
                break
              }
            }
            //删除旧节点
            _deleteOldNodeInfo()
            parent_node.splice(index, 0, node_info)
          } else {
            if (node.allow) {
              //判断是否是自己拖到自己
              if (node.id == node_info.id) {
                proxy.$message({
                  message: '禁止拖入自身',
                  type: 'warning',
                })
                return false
              }
              //删除旧节点
              _deleteOldNodeInfo()
              //插入到内部
              node.children.push(node_info)
            } else {
              node_info = { props: {} }
              proxy.$message({
                message: '禁止拖入',
                type: 'warning',
              })
            }
          }
        } else {
          //删除旧节点
          _deleteOldNodeInfo()
          //放入最外层数组
          node.push(node_info)
        }

        //设置当前操作对象
        store.dispatch('handleChangeCurrentNodeInfo', node_info)
      })
    }

    //递归获取当前元素距离最外层父元素的距离
    const _recursionGetOffsetTop = (ele: any) => {
      let offsetTop = ele.offsetTop //获取该元素对应父容器的上边距
      let offsetLeft = ele.offsetLeft //对应父容器的上边距
      //判断是否有父容器，如果存在则累加其边距
      while ((ele = ele.offsetParent)) {
        //等效 obj = obj.offsetParent;while (obj != undefined)
        offsetTop += ele.offsetTop //叠加父容器的上边距
        offsetLeft += ele.offsetLeft //叠加父容器的左边距
      }
      return { offsetTop, offsetLeft }
    }

    //是否显示边框线
    const handleShowBorder = (node: any) => {
      let white_list = [
        'el-container',
        'el-row',
        'el-col',
        'el-form',
        'el-form-item',
        'el-descriptions',
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
        } else if (level > 4) {
          //找5层 后返回
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

    /**
     * 控件拖动开始 设计窗口内的控件拖动 相当于先复制一个节点 然后拖动完成后删除原节点
     * @param componet 单个控件节点 包含children
     */
    const handleDragStart = (node: any, e: any) => {
      //设置拖拽数据
      e.dataTransfer.setData('node', JSON.stringify(node))
      //隐藏属性栏 设置当前操作对象
      store.dispatch('handleChangeCurrentNodeInfo', { props: {} })
      //设置当前拖动对象
      store.dispatch('handleChangeDragNodeInfo', node)
    }

    /**
     * 设计窗口内拖拽删除旧节点方法
     */
    const _deleteOldNodeInfo = () => {
      //判断是否是设计窗口内控件拖拽
      if (Object.keys(store.state.drag_node_info).length > 0) {
        //删除之前的控件
        _handleRecursionDelete(
          store.state.drag_node_info.id,
          data.sotre_component_tree_list
        )
        //设置当前拖动对象
        store.dispatch('handleChangeDragNodeInfo', {})
      }
    }

    /**
     * 判断是否是设计窗口内,上拖还是下拖 还是控件栏拖入 计算插入的索引
     */
    const _handleCalcDragInsertIndex = (
      block_node_index: number,
      block_parent_node: any
    ) => {
      //判断是否是设计窗口内控件拖拽
      if (Object.keys(store.state.drag_node_info).length > 0) {
        //找到拖拽节点的位置  和 占位块索引做比较 如果是往上拖 则不需要重新计算 往下拖 则需要删除
        let parent_node = _handleRecursionGetParentNode(
          store.state.drag_node_info,
          data.sotre_component_tree_list
        )
        // ps:还有一种是不是同级别的拖拽，这个时候插入索引不需要改变
        if (parent_node != block_parent_node) {
          return block_node_index
        }
        if (parent_node.children) {
          //说明在内 二层及以上
          parent_node = parent_node.children
        }
        //当前鼠标所在元素边界元素索引
        let index = 0
        for (let i = 0; i < parent_node.length; i++) {
          const child = parent_node[i]
          if (child.id == store.state.drag_node_info.id) {
            index = i
            break
          }
        }
        if (block_node_index - index >= 1) {
          //说明占位块在拖动元素的下面
          return block_node_index - 1
        } else {
          //在上面
          return block_node_index
        }
      } else {
        return block_node_index
      }
    }

    /**
     * 放开拖动元素 删除占位块
     */
    const handleDragEnd = (e: any) => {
      _handleRecursionDelete('block_node', data.sotre_component_tree_list)
    }

    return {
      ...toRefs(data),
      handleDragEnterOnNode,
      handleDragOverOnNode,
      handleDropOnNode,
      handleShowBorder,
      handleClick,
      handleDragStart,
      handleDragEnd,
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
  border: 1px solid $theme;
}
.hover-border {
  border: 1px dashed $theme;
}
</style>