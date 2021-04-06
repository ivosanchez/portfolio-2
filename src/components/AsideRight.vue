<template>
  <aside class="aside-right"></aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.aside-right {
  width: $mobile-column-line-5-right;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  color: white;
  pointer-events: none;
}
</style>
