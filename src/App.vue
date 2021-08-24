<template>
  <el-config-provider :locale="locale">
    <status-bar>
      <template #title>
        <div class="title">vue-element-visual-layout</div>
      </template>
    </status-bar>
    <drawer />
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import StatusBar from '@/components/StatusBar.vue'
import Drawer from '@/components/Drawer.vue'

//多语言
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  components: {
    StatusBar,
    Drawer,
    [ElConfigProvider.name]: ElConfigProvider, //多语言组件
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    //设置默认主题
    store.dispatch('handleChangeTheme', store.state.setting.theme_type)

    //设置多语言
    const locale = zhCn

    return { router, store, locale }
  },
})
</script>

<style lang="scss">
#app {
  width: 100%;
  padding-top: 40px;
  height: calc(100vh - 40px);
  overflow: auto;
  background: $bg;
}
</style>
<style lang="scss" scoped>
.title {
  cursor: pointer;
  -webkit-app-region: no-drag;
}
</style>
