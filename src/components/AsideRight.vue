<template>
  <aside class="aside-right">
    <div class="">
      <span>Right</span>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
aside {
  width: $mobile-column-line-5-right;
  height: 100%;
  color: white;
  position: absolute;
  text-align: right;
}
.aside-right {
  right: 1rem;
}
</style>
