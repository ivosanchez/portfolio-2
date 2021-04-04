<template>
  <div class="project">
    <div :class="['project__header', index % 2 === 0 ? 'align-left' : 'align-right']">
      <span class="project__number">0{{ index + 1 }}.</span>
      <router-link :to="project.link">
        <h3 class="project__name">
          {{ project.name }}
        </h3>
      </router-link>
    </div>
    <ul :class="['techs', index % 2 === 0 ? 'align-left' : 'align-right']">
      <li class="project__tech" v-for="tech in project.techs" v-bind:key="tech.name">{{ tech }}</li>
    </ul>
    <img :src="getAsset(project.imgUrl)" />
    <p class="desc">This is a description of the project.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: 'Project',
  props: { project: Object, index: Number },
  setup() {
    const getAsset = (url: string) => require(`@/assets/${url}`);

    return { getAsset };
  },
});
</script>

<style lang="scss" scoped>
.align-left {
  align-items: flex-start;
  h3,
  li {
    text-align: left;
  }
}
.align-right {
  align-items: flex-end;
  h3,
  li {
    text-align: right;
  }
}

.project {
  width: 100%;
  margin-bottom: 50vh;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  .project__header {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    span {
      color: $primary;
      font-size: 1.5rem;
    }
    h3 {
      margin-top: 1rem;
      margin-bottom: 1rem;
      color: white;
      font-size: 2.5rem;
    }
  }
  img {
    margin-bottom: 1rem;
    width: 100%;
  }
  ul {
    margin-bottom: 1rem;
    li {
      display: block;
      color: white;
      font-size: 1rem;
    }
  }
  .desc {
    color: white;
    font-weight: 300;
  }
}
</style>
