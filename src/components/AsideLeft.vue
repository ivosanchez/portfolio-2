<template>
  <aside class="aside-left">
    <div class="vertical" ref="verticalRef">
      <router-link to="/">
        <span>Home</span>
      </router-link>
      <router-link to="/">
        <span>Contact</span>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import gsap from 'gsap';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'AsideLeft',
  setup() {
    const verticalRef = ref<HTMLDivElement | null>(null);

    const runAnim = () => {
      if (verticalRef.value) {
        const spans = verticalRef.value.querySelectorAll('span');
        gsap.from(spans, { duration: 1, delay: 2, opacity: 0, y: 20 });
      }
    };

    onMounted(() => {
      runAnim();
    });

    return { verticalRef };
  },
});
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  top: 0;
  left: 0;
  width: $mobile-column-line-1-left;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
  .vertical {
    writing-mode: vertical-rl;
    text-orientation: upright;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
    font-size: 0.7rem;
    height: 50%;
    display: flex;
    justify-content: space-between;
    a {
      pointer-events: auto;
      color: white;
      &:hover {
        color: $primary;
      }
    }
  }
}
.aside-left {
  left: 1rem;
}
</style>
