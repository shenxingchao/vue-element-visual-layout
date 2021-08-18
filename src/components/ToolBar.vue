<template>
  <el-alert title="测试版本v1.0.0上线啦" type="success"></el-alert>
  <el-row class="tool-bar" justify="space-between">
    <el-col :span="2">{{title}}</el-col>
    <el-col :span="2">
      <el-row justify="end">
        <el-col :span="12">
          <!--  界面设计 -->
          <svg-icon name="layout" className="icon" @click="handleClickWatchCode(1)" />
        </el-col>
        <el-col :span="12">
          <!--  查看代码 -->
          <svg-icon name="source_code" className="icon" @click="handleClickWatchCode(2)" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ToolBar',
  //组件发出的事件需要定义
  emits: ['handleChangeDesigner'],
  setup(props, { emit }) {
    const store = useStore()

    //数据对象
    let data: any = reactive({
      title: '设计窗口', //工具栏标题
    })

    //查看代码
    const handleClickWatchCode = (val: number) => {
      switch (val) {
        case 1:
          data.title = '设计窗口'
          break
        case 2:
          data.title = '查看代码'
          break
        default:
          break
      }
      emit('handleChangeDesigner', val)
    }

    return {
      ...toRefs(data),
      handleClickWatchCode,
    }
  },
})
</script>
<style lang="scss" scoped>
.tool-bar {
  padding: 10px 20px;
  background: $bg;
  color: $h2c;
}
.icon {
  -webkit-app-region: no-drag;
  width: 20px;
  height: 20px;
  fill: $h3c;
  cursor: pointer;
  &:hover {
    fill: $h1c;
  }
}
</style>