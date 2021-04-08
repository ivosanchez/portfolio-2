<template>
  <a class="arrow-btn" role="button" href="www.google.com">
    <div class="arrow-btn__mask">
      <span>Github</span>
    </div>
    <div class="arrow-btn__rarr">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        ></path>
      </svg>
    </div>
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
    padding: 1rem;
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
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid white;
    svg {
      width: 1.4rem;
      color: white;
    }
  }
  &:hover {
    .arrow-btn__mask {
      clip-path: polygon(0 0, calc(100% - 2.8rem) 0, calc(100% - 2.8rem) 100%, 0% 100%);
    }
  }
}
</style>
