<template>
  <div class="menu-icon__container" ref="containerRef" @click="onMenuClick">
    <div class="menu-icon__lines">
      <span class="menu-icon__line"></span>
      <span class="menu-icon__line"></span>
    </div>
    <span class="menu-icon__text">Menu</span>
  </div>
</template>

<script lang="ts">
import { MUTAIONS, useStore } from '@/store';
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';

export default defineComponent({
  name: 'MenuIcon',
  setup() {
    const containerRef = ref<HTMLDivElement | null>(null);
    const { commit } = useStore();
    const onMenuClick = () => {
      commit(MUTAIONS.TOGGLE_MENU);
    };

    onMounted(() => {
      if (!containerRef.value) return;
      gsap.from(containerRef.value, { duration: 0.5, delay: 3.5, height: 0, overflow: 'hidden' });
    });

    return { containerRef, onMenuClick };
  },
});
</script>

<style lang="scss" scoped>
.menu-icon__container {
  @media screen and (min-width: 1000px) {
    left: 1.5rem;
  }
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  height: 2rem;
  display: flex;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
  .menu-icon__lines {
    width: 10px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    span {
      width: 2px;
      height: 100%;
      background-color: white;
      transition: transform 0.1s ease-in-out;
    }
  }
  .menu-icon__text {
    @media screen and (min-width: 1000px) {
      display: inline-block;
    }
    display: none;
    margin-left: 1rem;
    color: white;
    font-size: 0.9rem;
  }
  &:hover {
    .menu-icon__text {
      color: $primary;
    }
    .menu-icon__lines {
      span:first-child {
        transform: translateY(3px);
      }
      span:last-child {
        transform: translateY(-3px);
      }
    }
  }
}
</style>
