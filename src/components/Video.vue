<template>
  <video
    src="@/assets/polartypes/record.webm"
    :poster="getAsset(imgUrl)"
    @click="togglePlayVideo"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    ref="videoRef"
  />
</template>

<script lang="ts">
import { CURSOR, MUTAIONS, useStore } from '@/store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Video',
  props: { imgUrl: String },
  setup() {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const videoCursor = document.getElementById('video-cursor');

    const {
      commit,
      state: { cursor },
    } = useStore();

    const getAsset = (url: string) => require(`@/assets/${url}`);

    const changeCursor = () => {
      if (!videoCursor || !videoRef.value) return;
      if (videoRef.value.paused && cursor !== CURSOR.PLAY) {
        commit(MUTAIONS.SET_CURSOR, CURSOR.PLAY);
        return;
      }
      if (!videoRef.value.paused && cursor !== CURSOR.PAUSE) {
        commit(MUTAIONS.SET_CURSOR, CURSOR.PAUSE);
      }
    };

    const onMouseEnter = () => {
      if (!videoCursor) return;
      videoCursor.style.opacity = '1';
      changeCursor();
    };

    const onMouseLeave = () => {
      if (!videoCursor) return;
      videoCursor.style.opacity = '0';
    };

    const togglePlayVideo = () => {
      if (!videoRef.value) return;
      if (videoRef.value.paused) {
        videoRef.value.play();
      } else {
        videoRef.value.pause();
      }
      changeCursor();
    };

    return {
      getAsset,
      onMouseEnter,
      onMouseLeave,
      togglePlayVideo,
      videoRef,
    };
  },
});
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  opacity: 0.7;
  cursor: none;
}
</style>
