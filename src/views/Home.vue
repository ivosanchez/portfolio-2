<template>
  <main>
    <LeaveAnimation />
    <div class="intro">
      <h1 ref="h1Ref">Portfolio</h1>
    </div>
    <ul>
      <li v-for="(project, index) in projects" v-bind:key="index">
        <Project :project="project" :index="index" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';
import Project from '../components/Project.vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import { projects } from '../constants/projects';

export default defineComponent({
  name: 'Home',
  components: { Project, LeaveAnimation },
  setup() {
    const h1Ref = ref<HTMLHeadingElement | null>(null);

    onMounted(() => {
      if (h1Ref.value) {
        const tl = gsap.timeline();
        tl.from(h1Ref.value, { duration: 1, delay: 2, x: -h1Ref.value.clientWidth - 5 });
      }
    });
    return { h1Ref, projects };
  },
});
</script>

<style lang="scss" scoped>
.intro {
  height: 100vh;
  margin-top: 30vh;
  margin-left: $mobile-column-line-1-left;
  margin-right: $mobile-column-line-5-right;
  overflow-x: hidden;
  h1 {
    display: inline-block;
    color: white;
    font-size: 3rem;
    font-weight: 600;
    box-sizing: content-box;
  }
}
</style>
