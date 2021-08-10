<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle">
      <h3>vue-element-visual-layout</h3>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    //定义router
    const router = useRouter()
    const route = useRoute()

    return { router, route }
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>