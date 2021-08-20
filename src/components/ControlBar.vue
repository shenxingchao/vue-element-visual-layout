<template>
  <el-aside width="210px" style="background-color: rgb(238, 241, 246)" @dragenter="handleDragEnterContrlList">
    <el-menu :default-openeds="['0']" :unique-opened="true">
      <template v-for="(components,index) in components_list.components" :key="index">
        <el-submenu :index="index + ''">
          <template #title><i :class="components.icon"></i>{{components.title}}</template>
          <el-menu-item-group>
            <template #title>{{components.type}}</template>
            <template v-for="(component,i) in components.children" :key="i">
              <el-menu-item :index="index+'-'+i" :draggable="true" @dragstart="handleDragStart(component,$event)">
                {{component.title}}
              </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
//导入公共方法
import mixins from '@/mixins/index'

//导入控件列表
import components_list from '@/config/components_list'

export default defineComponent({
  name: 'ControlBar',
  setup() {
    const store = useStore()

    //数据对象
    let data: any = reactive({})

    //递归删除旧的占位块
    const { _handleRecursionDelete } = mixins()

    /**
     * 控件拖动开始       console.log('1.拖动控件节点信息 handleDragStart:', component)
     * @param componet 单个控件节点 包含children
     */
    const handleDragStart = (component: any, e: any) => {
      //参考自 https://github.com/OXOYO/X-Page-Editor-Vue/blob/master/example/components/CustomListItem.vue
      // 生成唯一id
      component.id = 'node-' + new Date().getTime()
      //如果有children children也要加唯一id
      component.children.forEach((children: any) => {
        children.id = 'node-' + new Date().getTime()
      })

      //设置拖拽数据
      e.dataTransfer.setData('node', JSON.stringify(component))
    }

    /**
     * 拖入控件栏，用于删除组件树内的占位块 console.log('7.拖入控件栏，用于删除组件树内的占位块 handleDragEnterContrlList')
     */
    const handleDragEnterContrlList = (e: any) => {
      _handleRecursionDelete('block_node', store.state.component_tree_list)
    }

    return {
      ...toRefs(data),
      components_list,
      handleDragStart,
      handleDragEnterContrlList,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>