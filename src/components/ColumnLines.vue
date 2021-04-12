<template>
  <div class="container" ref="containerRef">
    <div class="column-line column-line-1"></div>
    <div class="column-line column-line-2"></div>
    <div class="column-line column-line-3"></div>
    <div class="column-line column-line-4"></div>
    <div class="column-line column-line-5"></div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const containerRef = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (containerRef.value) {
        const lines = containerRef.value.querySelectorAll('div');
        gsap.from(lines, { duration: 1, height: 0, stagger: 0.3 });
      }
    });

    return { containerRef };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  background-color: black;
  pointer-events: none;

  .column-line {
    @include column-line;
  }
}

.column-line-1 {
  left: $mobile-column-line-1-left;
}
.column-line-3 {
  left: $mobile-column-line-3-left;
}
.column-line-5 {
  right: $mobile-column-line-5-right;
}
.column-line-2 {
  left: $column-line-2-left;
  visibility: hidden;
}
.column-line-4 {
  left: $column-line-4-left;
  visibility: hidden;
}

@media screen and (min-width: 1000px) {
  .column-line-1 {
    left: $column-line-1-left;
  }
  .column-line-3 {
    left: $column-line-3-left;
  }
  .column-line-5 {
    left: $column-line-5-left;
  }
  .column-line-2,
  .column-line-4 {
    visibility: visible;
  }
}
</style>
