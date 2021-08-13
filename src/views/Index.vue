<template>
  <el-container class="container">
    <control-bar></control-bar>
    <designer></designer>
    <attribute-bar></attribute-bar>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ControlBar from '@/components/ControlBar.vue'
import AttributeBar from '@/components/AttributeBar.vue'
import Designer from '@/components/Designer.vue'

export default defineComponent({
  components: {
    ControlBar,
    AttributeBar,
    Designer,
  },
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
  height: 100%;
}
</style>