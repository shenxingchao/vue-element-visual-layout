<template>
  <el-aside width="240px" style="background-color: rgb(238, 241, 246)" @dragenter="handleDragEnterContrlList"
            @dragend="handleDragEnd">
    <el-menu :default-openeds="['0']" :unique-opened="true">
      <template v-for="(components,index) in components_list.components" :key="index">
        <el-sub-menu :index="index + ''">
          <template #title>
            <div class="icon-box">
              <svg-icon :name="components.icon" className="icon" />
              {{components.title}}
            </div>
          </template>
          <el-menu-item-group>
            <template #title>{{components.type}}</template>
            <template v-for="(component,i) in components.children" :key="i">
              <el-menu-item :index="index+'-'+i" :draggable="true" @dragstart="handleDragStart(component,$event)">
                {{component.title}} <span class="en-title">{{component.name}}</span>
              </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
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

    /**
     * 放开拖动元素 删除占位块
     */
    const handleDragEnd = (e: any) => {
      _handleRecursionDelete('block_node', store.state.component_tree_list)
    }

    return {
      ...toRefs(data),
      components_list,
      handleDragStart,
      handleDragEnterContrlList,
      handleDragEnd,
    }
  },
})
</script>
<style lang="scss" scoped>
.icon {
  width: 16px;
  height: 16px;
  fill: $h3c;
}
.en-title {
  color: $h3c;
  font-size: 12px;
}
</style>