<template>
  <el-alert v-if="show_tips" title="测试版本v1.0.0上线啦" type="success"></el-alert>
  <el-row class="tool-bar" justify="space-between">
    <el-col :span="20">{{title}}</el-col>
    <el-col :xs="4" :sm="4" :md="4" :lg="4">
      <el-row justify="end">
        <el-col :span="6">
          <!--  设计窗口 -->
          <el-tooltip effect="dark" content="设计窗口/切换显示边框" placement="bottom">
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
          <!--  清空布局 -->
          <el-tooltip effect="dark" content="清空布局" placement="bottom">
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
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
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
      show_tips: true, //是否显示提示消息
    })

    //挂载事件
    onMounted(() => {
      setTimeout(() => {
        data.show_tips = false //隐藏提示消息
      }, 3000)
    })

    //点击工具栏按钮
    const handleClickToolBtn = (val: number) => {
      switch (val) {
        case 1:
          //原地切换改变显示边框状态
          if (data.title == '设计窗口') {
            store.dispatch('handleChangeShowBorder', !store.state.show_border)
          }
          data.title = '设计窗口'
          emit('handleChangeDesigner', val)
          break
        case 2:
          data.title = '查看代码'
          emit('handleChangeDesigner', val)
          break
        case 3:
          if (data.title == '设计窗口') {
            //清空布局
            emit('handleClearLayout', val)
          }
          break
        case 4:
          if (data.title == '设计窗口') {
            //删除控件
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