<template>
  <aside class="aside-right"></aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.aside-right {
  @include aside;
  right: 0;
  color: white;
}
</style>
