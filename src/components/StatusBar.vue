<template>
  <div class="title_bar">
    <div class="title">
      <slot name="title">默认标题</slot>
    </div>
    <div class="tool_btn">
      <svg-icon name="setting" className="icon" @click="handleClickSetting" />
    </div>
    <div class="title_line"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'StatusBar',

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    //基本类型用这个
    //显示抽屉
    let drawer = ref(false)

    const handleClickSetting = () => {
      store.dispatch('handleChangeDrawer', !store.state.setting.show_drawer)
    }

    return {
      store,
      router,
      route,
      drawer,
      handleClickSetting,
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
    width: 80px;
    height: 40px;
    display: flex;
    justify-content: center;
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
