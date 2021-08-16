<template>
  <el-aside class="attribute-bar" width="280px">
    <el-form ref="attribute" :model="attribute" label-width="60px">
      <el-form-item v-if="attribute.gutter||attribute.gutter==0" label="gutter">
        <el-input-number v-model="attribute.gutter" :controls="true">
        </el-input-number>
      </el-form-item>
      <el-form-item v-if="attribute.span" label="span">
        <el-input-number v-model="attribute.span" :controls="true">
        </el-input-number>
      </el-form-item>
      <el-form-item v-if="attribute.type||attribute.type==''" label="type">
        <el-input v-model="attribute.type"></el-input>
      </el-form-item>
      <el-form-item v-if="attribute.class||attribute.class==''" label="class">
        <el-input v-model="attribute.class"></el-input>
      </el-form-item>
    </el-form>
  </el-aside>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AttributeBar',
  setup() {
    const store = useStore()

    //数据对象
    let data: any = reactive({})

    //计算属性
    const attribute = computed({
      get() {
        return store.state.current_node_info.props
      },
      set(val) {},
    })

    //属性改变每次设置高亮 不然高亮边框会消失
    watch(
      attribute,
      (a: any, b: any) => {
        nextTick(() => {
          //清除高亮边框
          let border = document.getElementsByClassName(
            'border'
          )[0] as HTMLElement
          if (border) {
            border.className = border.className.replace(' border', '')
          }
          //高亮控件边框
          let node_element = document.getElementById(
            store.state.current_node_info.id
          ) as HTMLElement
          if (node_element) {
            node_element.className = node_element.className + ' border'
          }
        })
      },
      { deep: true }
    )

    return {
      ...toRefs(data),
      attribute,
    }
  },
})
</script>
<style lang="scss" scoped>
.attribute-bar {
  background-color: rgb(238, 241, 246);
  padding: 20px 10px;
}
</style>