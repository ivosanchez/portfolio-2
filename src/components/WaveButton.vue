<template>
  <svg>
    <filter id="noise" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence id="turbulence" baseFrequency="0.01 0.01" numOctaves="1" seed="2" />
      <feDisplacementMap in="SourceGraphic" scale="20" />
      <animate
        xlink:href="#turbulence"
        attributeName="baseFrequency"
        dur="60s"
        keyTimes="0;0.5;1"
        values="0.02 0.06;0.04 0.08;0.02 0.06"
        repeatCount="indefinite"
      ></animate>
    </filter>
  </svg>
  <div class="wave-btn__container">
    <a :href="href" target="_blank">
      <img :src="getAsset(imgSrc)" alt="" />
      <span>{{ language === 'ko' ? `${name} 방문하기` : `Go to ${name}` }}</span>
    </a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getAsset } from '../utils';

export default defineComponent({
  name: 'WaveButton',
  props: {
    name: { required: true, type: String },
    href: { required: true, type: String },
    language: { required: true, type: String },
    imgSrc: { required: true, type: String },
  },
  setup() {
    return { getAsset };
  },
});
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
}
.wave-btn__container {
  @include mobile-23-desktop-2345__margins;
  background-color: rgba(255, 255, 255, 100);
  transition: background-color 0.5s;
  a {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2em 0;
    display: grid;
    place-items: center;
    font-size: $font-size-s;
    overflow: hidden;
    img {
      position: absolute;
      z-index: -1;
      width: 120%;
      height: 120%;
      object-fit: cover;
      filter: url(#noise);
    }
    span {
      font-weight: 600;
      color: black;
      transition: opacity 0.5s;
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0);
    span {
      opacity: 0;
    }
  }
}
</style>
