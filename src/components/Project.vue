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
      <Video :posterUrl="posterUrl" />
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
    span {
      @media screen and (min-width: 1000px) {
        font-size: 3rem;
      }
      color: $primary;
      font-size: 1.5rem;
    }
    .project__name {
      @media screen and (min-width: 1000px) {
        font-size: 6rem;
      }
      margin-top: 1rem;
      margin-bottom: 1rem;
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
      transition: color 0.3s;
      &:hover {
        color: $primary;
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
      @media screen and (min-width: 1000px) {
        font-size: 2rem;
      }
      display: block;
      color: white;
      font-size: 1.3rem;
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
  @media screen and (min-width: 1000px) {
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
  @media screen and (min-width: 1000px) {
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
