<template>
  <div class="visit-btn__container" ref="containerRef">
    <div class="visit-btn__bg">
      <span class="visit-btn__arrow">&rarr;</span>
      <div class="visit-btn" role="button">
        <span>Visit Polartypes</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { defineComponent, onMounted, ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: 'VisitButton',
  setup() {
    const containerRef = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (containerRef.value) {
        gsap.to(containerRef.value, {
          // scrollTrigger: {
          //   trigger: containerRef.value,
          //   start: 'center 25%',
          //   toggleActions: 'play none none resume',
          // },
          // duration: 1,
          // bottom: 10,
          // right: 10,
        });
      }
    });

    return { containerRef };
  },
});
</script>

<style lang="scss" scoped>
.visit-btn__container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  .visit-btn__bg {
    position: relative;
    .visit-btn__arrow {
      position: absolute;
      top: 50%;
      left: 0.5rem;
      transform: translateY(-50%);
      color: white;
      font-size: 1.5rem;
    }
  }
  .visit-btn {
    width: 100%;
    padding: 0.5rem 0;
    background-color: white;
    text-align: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: clip-path 0.5s;
    cursor: pointer;
    span {
      color: black;
    }
    &:hover {
      clip-path: polygon(2.5rem 0, 100% 0, 100% 100%, 2.5rem 100%);
    }
  }
}
</style>
