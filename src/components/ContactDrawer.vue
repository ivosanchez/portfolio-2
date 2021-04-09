<template>
  <div class="contact-drawer">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // setup() {
  // },
});
</script>

<style lang="scss" scoped>
.contact-drawer {
  @include drawer;
  position: absolute;
  height: 100%;
  background-color: white;
  div {
  }
}
</style>
