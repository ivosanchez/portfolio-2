<template>
  <aside class="aside-left" ref="asideRef">
    <div />
    <router-link to="/">
      <span>Home</span>
    </router-link>
    <router-link to="/about">
      <span>About</span>
    </router-link>
    <div />
  </aside>
</template>

<script lang="ts">
import gsap from 'gsap';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'AsideLeft',
  setup() {
    const asideRef = ref<HTMLDivElement | null>(null);

    const runAnim = () => {
      if (asideRef.value) {
        const spans = asideRef.value.querySelectorAll('span');
        gsap.from(spans, { duration: 1, delay: 2.5, opacity: 0, y: 20 });
      }
    };

    onMounted(() => {
      runAnim();
    });

    return { asideRef };
  },
});
</script>

<style lang="scss" scoped>
.aside-left {
  @include aside;
  left: 0;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  a {
    width: 50%;
    pointer-events: auto;
    color: white;
    span {
      writing-mode: vertical-rl;
      text-orientation: upright;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      font-size: 0.7rem;
      display: block;
    }
    &:hover {
      color: $primary;
    }
  }
}
</style>
