<template>
  <status-bar>
    <template v-slot:title>
      <div class="title">vue-element-visual-layout</div>
    </template>
  </status-bar>
  <drawer />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import StatusBar from '@/components/StatusBar.vue'
import Drawer from '@/components/Drawer.vue'

export default defineComponent({
  components: {
    StatusBar,
    Drawer,
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    //设置默认主题
    store.dispatch('handleChangeTheme', store.state.setting.theme_type)

    return { router, store }
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
