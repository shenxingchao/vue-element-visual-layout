<template>
  <el-drawer custom-class="drawer" title="我是标题" v-model="store.state.setting.show_drawer" :with-header="false">
    <el-row class="version">
      当前版本:{{package_json.version}}
    </el-row>
    <el-row class="block" type="flex" justify="space-between" align="middle">
      <div>
        <el-button size="mini" @click="handleClickChangeTheme(1)">默认红</el-button>
      </div>
      <div>
        <el-button size="mini" @click="handleClickChangeTheme(2)">天空蓝</el-button>
      </div>
    </el-row>
    <el-row class="block" type="flex" justify="space-between" align="middle">
      <div>
        <el-button size="mini" @click="handleClickChangeTheme(3)">青草绿</el-button>
      </div>
      <div>
        <el-button size="mini" @click="handleClickChangeTheme(4)">炫酷紫</el-button>
      </div>
    </el-row>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Drawer',
  setup() {
    const store = useStore()
    //获取版本号
    let package_json = require('../../package.json')
    const handleClickChangeTheme = (theme_type: number) => {
      store.dispatch('handleChangeTheme', theme_type)
    }

    return { store, package_json, handleClickChangeTheme }
  },
})
</script>
<style lang="scss">
.drawer {
  width: 200px;
  max-width: 200px;
  padding: 20px;
  padding-top: 60px;
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.version {
  font-size: 12px;
  color: $h3c;
}
</style>