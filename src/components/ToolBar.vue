<template>
  <el-alert title="测试版本v1.0.0上线啦" type="success"></el-alert>
  <el-row class="tool-bar" justify="space-between">
    <el-col :span="2">{{title}}</el-col>
    <el-col :span="4">
      <el-row justify="end">
        <el-col :span="6">
          <!--  设计窗口 -->
          <el-tooltip effect="dark" content="设计窗口" placement="bottom">
            <svg-icon name="layout" className="icon" @click="handleClickToolBtn(1)" />
          </el-tooltip>
        </el-col>
        <el-col :span="6">
          <!--  查看代码 -->
          <el-tooltip effect="dark" content="查看代码" placement="bottom">
            <svg-icon name="source_code" className="icon" @click="handleClickToolBtn(2)" />
          </el-tooltip>
        </el-col>
        <el-col :span="6">
          <!--  清除布局 -->
          <el-tooltip effect="dark" content="清除布局" placement="bottom">
            <svg-icon name="clear_layout" className="icon" @click="handleClickToolBtn(3)" />
          </el-tooltip>
        </el-col>
        <el-col :span="6">
          <!--  删除控件 -->
          <el-tooltip effect="dark" content="删除控件 DELETE" placement="bottom">
            <svg-icon name="delete" className="icon" @click="handleClickToolBtn(4)" />
          </el-tooltip>
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
  emits: ['handleChangeDesigner', 'handleClearLayout', 'handleDeleteControl'],
  setup(props, { emit }) {
    const store = useStore()

    //数据对象
    let data: any = reactive({
      title: '设计窗口', //工具栏标题
    })

    //点击工具栏按钮
    const handleClickToolBtn = (val: number) => {
      switch (val) {
        case 1:
          data.title = '设计窗口'
          emit('handleChangeDesigner', val)
          break
        case 2:
          data.title = '查看代码'
          emit('handleChangeDesigner', val)
          break
        case 3:
          if (data.title == '设计窗口') {
            emit('handleClearLayout', val)
          }
          break
        case 4:
          if (data.title == '设计窗口') {
            emit('handleDeleteControl', val)
          }
          break
        default:
          break
      }
    }

    return {
      ...toRefs(data),
      handleClickToolBtn,
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
  outline: none;
  &:hover {
    fill: $h1c;
  }
}
</style>