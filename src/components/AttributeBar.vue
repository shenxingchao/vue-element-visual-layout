<template>
  <el-aside class="attribute-bar" width="310px">
    <h4>{{node_info.title}}</h4>
    <el-form ref="attribute" :model="attribute" label-width="68px">
      <!-- el-row start -->
      <template v-if="node_info.name == 'el-row'">
        <el-form-item v-if="attribute.gutter||attribute.gutter==0" label="栅格间隔">
          <el-input-number v-model="attribute.gutter" :controls="true" :min="0">
          </el-input-number>
        </el-form-item>
        <el-form-item v-if="attribute.justify||attribute.justify==''" label="水平对齐">
          <el-select v-model="attribute.justify" placeholder="水平对齐">
            <el-option key="start" label="左对齐" value="start"></el-option>
            <el-option key="center" label="居中" value="center"></el-option>
            <el-option key="end" label="右对齐" value="end"></el-option>
            <el-option key="space-around" label="两端对齐(around)" value="space-around"></el-option>
            <el-option key="space-between" label="两端对齐(between)" value="space-between"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="attribute.align||attribute.align==''" label="垂直对齐">
          <el-select v-model="attribute.align" placeholder="垂直对齐">
            <el-option key="top" label="顶部" value="top"></el-option>
            <el-option key="middle" label="居中" value="middle"></el-option>
            <el-option key="bottom" label="底部" value="bottom"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="attribute.type||attribute.type==''" label="类型">
          <el-input v-model="attribute.type"></el-input>
        </el-form-item>
      </template>
      <!-- el-row end -->
      <!-- el-col start -->
      <template v-if="node_info.name == 'el-col'">
        <el-form-item v-if="attribute.span" label="span">
          <el-input-number v-model="attribute.span" :controls="true">
          </el-input-number>
        </el-form-item>
      </template>
      <!-- el-col end -->
      <!-- public attribute start-->
      <el-form-item v-if="attribute.class||attribute.class==''" label="class">
        <el-input v-model="attribute.class"></el-input>
      </el-form-item>
      <!-- public attribute end-->
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

    //当前操作控件信息
    const node_info: any = computed(() => store.state.current_node_info)

    //计算属性
    const attribute: any = computed({
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
      node_info,
      attribute,
    }
  },
})
</script>
<style lang="scss" scoped>
.attribute-bar {
  background-color: rgb(238, 241, 246);
  padding: 20px;
}
</style>