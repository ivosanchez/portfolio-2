<template>
  <div :class="[index % 2 === 0 ? 'project-left' : 'project-right', 'project']">
    <div class="project__header">
      <span class="project__number">0{{ index + 1 }}.</span>
      <router-link :to="path">
        <h3 class="project__name">
          {{ name }}
        </h3>
      </router-link>
    </div>
    <ul class="techs">
      <li class="project__tech" v-for="tech in techs" v-bind:key="tech.name">{{ tech }}</li>
    </ul>
    <div class="video__wrapper">
      <Video :videoSrc="videoSrc" :posterUrl="posterUrl" />
    </div>
    <p class="project__desc">{{ desc }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Video from './Video.vue';

export default defineComponent({
  name: 'Project',
  components: { Video },
  props: {
    name: String,
    path: String,
    techs: Array,
    videoSrc: String,
    posterUrl: String,
    desc: String,
    index: Number,
  },
});
</script>

<style lang="scss" scoped>
.project {
  @include mobile-23-desktop-2345__paddings;
  width: 100%;
  display: grid;
  position: relative;
  grid-template:
    'header' 1fr
    'list' auto
    'video' auto
    'desc' 1fr / 1fr;
  .project__header {
    grid-area: header;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .project__number {
      color: $primary;
      font-size: $font-size-m;
    }
    a {
      z-index: 10;
      .project__name {
        font-family: 'Playfair Display', serif;
        margin: 0.4em 0;
        color: white;
        font-size: $font-size-xl;
        font-weight: 600;
        transition: color 0.3s;
        &:hover {
          color: $primary;
        }
      }
    }
  }
  .video__wrapper {
    grid-area: video;
  }
  ul {
    grid-area: list;
    align-self: center;
    margin-bottom: 1rem;
    li {
      display: block;
      color: white;
      font-size: $font-size-s;
      font-weight: 300;
    }
  }
  .project__desc {
    grid-area: desc;
    align-self: center;
    color: white;
    font-weight: 300;
    line-height: 1.4rem;
  }
}

.project-left {
  @media screen and (min-width: 1024px) {
    grid-template:
      'header header header header' auto
      'list video video video' 1fr
      'desc video video video' 1fr
      'desc video video video' 1fr /1fr 1fr 1fr 1fr;
  }
  ul,
  .project__header {
    align-items: flex-start;
  }
  h3,
  li,
  .project__desc {
    text-align: left;
  }
}
.project-right {
  @media screen and (min-width: 1024px) {
    grid-template:
      'header header header header' auto
      'video video video list' 1fr
      'video video video desc' 1fr
      'video video video desc' 1fr /1fr 1fr 1fr 1fr;
  }
  ul,
  .project__header {
    align-items: flex-end;
  }
  h3,
  li,
  .project__desc {
    text-align: right;
  }
}
</style>
