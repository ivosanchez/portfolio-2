<template>
  <a class="arrow-btn" role="button" href="www.google.com">
    <div class="arrow-btn__mask">
      <span>Github</span>
    </div>
    <span class="arrow-btn__rarr">&rarr;</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArrowButton',
});
</script>

<style lang="scss" scoped>
.arrow-btn {
  position: relative;
  display: block;
  width: 100%;
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0);
  .arrow-btn__mask {
    padding: 0.5rem;
    background-color: white;
    text-align: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: clip-path 0.4s;
    span {
      color: black;
    }
  }
  .arrow-btn__rarr {
    position: absolute;
    display: block;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: white;
    font-size: 1.4rem;
  }
  &:hover {
    .arrow-btn__mask {
      clip-path: polygon(0 0, calc(100% - 2.8rem) 0, calc(100% - 2.8rem) 100%, 0% 100%);
    }
  }
}
</style>
