<template>
  <div class="title_bar">
    <div class="title">
      <slot name="title">默认标题</slot>
      <svg-icon name="router_back" :className="is_back?'icon':'icon icon-disabled'" @click="handleClickRouterBack" />
      <svg-icon name="router_forward" :className="is_forward?'icon':'icon icon-disabled'"
                @click="handleClickRouterForward" />
    </div>
    <div class="tool_btn">
      <svg-icon name="setting" className="icon" @click="handleClickSetting" />
      <svg-icon name="mini" className="icon" @click="handleClickToolBtn('minimize')" />
      <svg-icon :name="max ? 'maxi_re' : 'maxi'" className="icon" @click="handleClickToolBtn('maximize')" />
      <svg-icon name="close" className="icon" @click="handleClickToolBtn('winclose')" />
    </div>
    <div class="title_line"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
//从渲染器进程到主进程的异步通信
import { ipcRenderer } from 'electron'

export default defineComponent({
  name: 'StatusBar',

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    //基本类型用这个
    //显示抽屉
    let drawer = ref(false)
    //是否是最大化状态  用于恢复按钮显示
    let max = ref(false)
    //是否可以返回
    let is_back = ref(false)
    //是否可以前进
    let is_forward = ref(false)

    const handleClickSetting = () => {
      store.dispatch('handleChangeDrawer', !store.state.setting.show_drawer)
    }

    const handleClickToolBtn = (type: string) => {
      switch (type) {
        // 最小化
        case 'minimize':
          ipcRenderer.send('win-min', '')
          break
        // 最大化
        case 'maximize':
          ipcRenderer.send('win-max', '')
          break
        // 关闭
        case 'winclose':
          ipcRenderer.send('win-close', '')
          break

        default:
          break
      }
    }

    //点击路由返回按钮
    const handleClickRouterBack = () => {
      if (!is_back) {
        return false
      }
      router.back()
    }

    //点击路由前进按钮
    const handleClickRouterForward = () => {
      if (!is_forward) {
        return false
      }
      router.forward()
    }

    onMounted(() => {
      //监听最大化状态变化 去改变最大化或者是恢复按钮
      ipcRenderer.send('listen-maximize')
      ipcRenderer.on('maximize-change', (event, arg) => {
        max.value = arg
      })
    })

    //数据实时计算显示，字符处理的用computed  涉及交互事件，异步处理，样式变化，符合条件逻辑处理，开销较大的用watch
    watch(store.state.route_list, (newValue, oldValue) => {
      let active_index = newValue.findIndex((item: any) => item.active == true)
      if (active_index == 0 && newValue.length == 1) {
        //不能前进也不能返回
        is_back.value = false
        is_forward.value = false
      } else if (active_index == 0 && newValue.length > 1) {
        //可以前进不能返回
        is_back.value = false
        is_forward.value = true
      } else if (active_index >= 1 && active_index < newValue.length - 1) {
        //可以返回也可以前进
        is_back.value = true
        is_forward.value = true
      } else if (active_index >= 1 && active_index == newValue.length - 1) {
        //可以返回不能前进
        is_back.value = true
        is_forward.value = false
      }
    })

    return {
      store,
      router,
      route,
      drawer,
      max,
      is_back,
      is_forward,
      handleClickSetting,
      handleClickToolBtn,
      handleClickRouterBack,
      handleClickRouterForward,
    }
  },
})
</script>

<style lang="scss" scoped>
.title_bar {
  width: calc(100% - 10px);
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99999999;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  color: $white;
  font-size: 12px;
  background: $theme;
  .title {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    .icon {
      -webkit-app-region: no-drag;
      width: 10px;
      height: 10px;
      border-radius: 4px;
      padding: 4px 10px;
      fill: $white;
      cursor: pointer;
      border: $border-transparent;
      &:hover {
        background: $light-theme;
      }
      &:active {
        background: $deep-theme;
        fill: $h1c;
      }
      &:first-of-type {
        margin-left: 20px;
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .icon-disabled {
      fill: $h3c;
      cursor: not-allowed;
      &:hover {
        background: none !important;
      }
      &:active {
        background: none !important;
        fill: $h3c;
      }
    }
  }
  .tool_btn {
    width: 132px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      -webkit-app-region: no-drag;
      width: 20px;
      height: 20px;
      padding: 10px;
      fill: $white;
      cursor: pointer;
      &:hover {
        background: $light-theme;
      }
      &:active {
        background: $deep-theme;
      }
      &:first-child {
        width: 28px;
        height: 28px;
        padding: 6px;
      }
    }
  }
  .title_line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    -webkit-app-region: no-drag;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    -webkit-app-region: no-drag;
  }
}
</style>
