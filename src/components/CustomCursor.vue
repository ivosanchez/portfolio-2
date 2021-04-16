<template>
  <div id="video-cursor" class="video-cursor__play" ref="cursorRef">
    <img src="@/assets/play.svg" v-show="cursor === 'PLAY'" />
    <img src="@/assets/pause.svg" v-show="cursor === 'PAUSE'" />
  </div>
</template>

<script lang="ts">
import { GETTERS, useStore } from '@/store';
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'CustomCursor',
  setup() {
    const cursorRef = ref<HTMLDivElement | null>(null);
    const isPlaying = ref(false);

    const { getters } = useStore();
    const cursor = ref(getters[GETTERS.GET_CURSOR]);

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.value) return;
      cursorRef.value.style.top = `${e.pageY - 30}px`;
      cursorRef.value.style.left = `${e.pageX - 30}px`;
    };

    onMounted(() => {
      window.addEventListener('mousemove', onMouseMove);
      watch(
        () => getters[GETTERS.GET_CURSOR],
        () => {
          cursor.value = getters[GETTERS.GET_CURSOR];
        }
      );
    });

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove);
    });
    return { cursorRef, isPlaying, cursor };
  },
});
</script>

<style lang="scss" scoped>
#video-cursor {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 60px;
  height: 60px;
  opacity: 0;
  pointer-events: none;
}
</style>
