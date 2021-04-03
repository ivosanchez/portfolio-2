<template>
  <aside class="aside-left">
    <div class="vertical">
      <span>Home</span>
      <span>Contact</span>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
aside {
  width: $mobile-column-line-1-left;
  height: 100%;
  color: white;
  position: absolute;
  display: flex;
  align-items: center;
  .vertical {
    writing-mode: vertical-rl;
    text-orientation: upright;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    font-size: 0.7rem;
    font-weight: 300;
    height: 50%;
    display: flex;
    justify-content: space-between;
  }
}
.aside-left {
  left: 1rem;
}
</style>
