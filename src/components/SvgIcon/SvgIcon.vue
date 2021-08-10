<template>
  <svg :class="'svg-icon ' + props.className" aria-hidden="true">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    className: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    return { props }
  },
})
</script>
