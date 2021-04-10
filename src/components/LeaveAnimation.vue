<template>
  <div class="full-page full-white" ref="fullWhiteRef"></div>
  <div class="full-page full-orange" ref="fullOrangeRef"></div>
  <div class="full-page full-black" ref="fullBlackRef"></div>
</template>

<script lang="ts">
import { MUTAIONS, useStore } from '@/store';
import gsap from 'gsap';
import { defineComponent, ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, NavigationGuard } from 'vue-router';

export default defineComponent({
  name: 'LeaveAnimation',
  setup() {
    const fullWhiteRef = ref<HTMLDivElement | null>(null);
    const fullOrangeRef = ref<HTMLDivElement | null>(null);
    const fullBlackRef = ref<HTMLDivElement | null>(null);
    const { commit } = useStore();

    const navigationGuard: NavigationGuard = (_, __, next) => {
      if (fullWhiteRef.value && fullOrangeRef.value && fullBlackRef.value) {
        const tl = gsap.timeline({ defaults: { duration: 0.5 } });
        tl.to([fullWhiteRef.value, fullOrangeRef.value, fullBlackRef.value], {
          left: 0,
        });
        tl.to(
          fullWhiteRef.value,
          {
            left: window.innerWidth,
          },
          '+=0.5'
        );
        tl.to(
          fullOrangeRef.value,
          {
            left: window.innerWidth,
            onComplete: () => {
              commit(MUTAIONS.TOGGLE_MENU, false);
              next();
            },
          },
          '-=0.4'
        );
      }
    };
    onBeforeRouteLeave(navigationGuard);
    onBeforeRouteUpdate(navigationGuard);

    return { fullWhiteRef, fullOrangeRef, fullBlackRef };
  },
});
</script>

<style lang="scss" scoped>
.full-page {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
}
.full-white {
  background-color: white;
  z-index: 100;
}
.full-orange {
  background-color: orange;
  z-index: 99;
}
.full-black {
  background-color: black;
  z-index: 90;
}
</style>
