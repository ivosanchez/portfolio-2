<template>
  <video
    :src="getAsset(videoSrc)"
    :poster="getAsset(posterUrl)"
    @click="togglePlayVideo"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    @play="onPlay"
    @ended="onEnded"
    ref="videoRef"
  />
</template>

<script lang="ts">
import { CURSOR, GETTERS, MUTAIONS, useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import { getAsset } from '../utils';

export default defineComponent({
  name: 'Video',
  props: {
    posterUrl: { required: true, type: String },
    videoSrc: { required: true, type: String },
  },
  setup() {
    const videoRef = ref<HTMLVideoElement | null>(null);

    const { commit, getters } = useStore();

    const changeCursor = () => {
      const videoCursor = document.getElementById('video-cursor');
      if (!videoCursor || !videoRef.value) return;
      if (videoRef.value.paused && getters[GETTERS.GET_CURSOR] !== CURSOR.PLAY) {
        commit(MUTAIONS.SET_CURSOR, CURSOR.PLAY);
        return;
      }
      if (!videoRef.value.paused && getters[GETTERS.GET_CURSOR] !== CURSOR.PAUSE) {
        commit(MUTAIONS.SET_CURSOR, CURSOR.PAUSE);
      }
    };

    const onMouseEnter = () => {
      const videoCursor = document.getElementById('video-cursor');
      if (!videoCursor) return;
      videoCursor.style.opacity = '1';
      changeCursor();
    };

    const onMouseLeave = () => {
      const videoCursor = document.getElementById('video-cursor');
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

    const onPlay = () => {
      if (!videoRef.value) return;
      videoRef.value.style.opacity = '1';
      changeCursor();
    };

    const onEnded = () => {
      if (!videoRef.value) return;
      videoRef.value.style.opacity = '0.7';
      changeCursor();
    };

    return {
      getAsset,
      onMouseEnter,
      onMouseLeave,
      onPlay,
      onEnded,
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
  transition: opacity 1s ease-in-out;
}
</style>
