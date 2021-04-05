<template>
  <div :class="[index % 2 === 0 ? 'project-left' : 'project-right', 'project']">
    <div class="project__header">
      <span class="project__number">0{{ index + 1 }}.</span>
      <router-link :to="project.link">
        <h3 class="project__name">
          {{ project.name }}
        </h3>
      </router-link>
    </div>
    <ul class="techs">
      <li class="project__tech" v-for="tech in project.techs" v-bind:key="tech.name">{{ tech }}</li>
    </ul>
    <video src="@/assets/polartypes/record.webm" @click="togglePlayVideo" />
    <!-- <img :src="getAsset(project.imgUrl)" /> -->
    <p class="project__desc">This is a description of the project.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Project',
  props: { project: Object, index: Number },
  setup() {
    const getAsset = (url: string) => require(`@/assets/${url}`);

    const togglePlayVideo = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video.paused) {
        video.play();
        return;
      }
      video.pause();
    };

    return { getAsset, togglePlayVideo };
  },
});
</script>

<style lang="scss" scoped>
.project {
  @include mobile-23-desktop-2345__paddings;
  width: 100%;
  margin-bottom: 50vh;
  display: grid;
  grid-template:
    'header' 1fr
    'list' auto
    'image' auto
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
    h3 {
      @media screen and (min-width: 1000px) {
        font-size: 6rem;
      }
      margin-top: 1rem;
      margin-bottom: 1rem;
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
    }
  }
  img,
  video {
    grid-area: image;
    margin-bottom: 1rem;
    width: 100%;
  }
  ul {
    grid-area: list;
    align-self: center;
    margin-bottom: 1rem;
    li {
      display: block;
      color: white;
      font-size: 1rem;
    }
  }
  .project__desc {
    grid-area: desc;
    align-self: center;
    color: white;
    font-weight: 300;
  }
}

.project-left {
  @media screen and (min-width: 1000px) {
    grid-template:
      'header header header header' auto
      'list image image image' 1fr
      'desc image image image' 1fr
      'desc image image image' 1fr /1fr 1fr 1fr 1fr;
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
      'image image image list' 1fr
      'image image image desc' 1fr
      'image image image desc' 1fr /1fr 1fr 1fr 1fr;
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
