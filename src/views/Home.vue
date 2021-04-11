<template>
  <LeaveAnimation />
  <Title />
  <div ref="scrollRef">
    <main>
      <div class="intro">
        <div class="intro__top">
          <div>
            <span>Optimized for Google Chrome.</span>
          </div>
          <div>
            <span>There are {{ count }} projects.</span>
            <span>Developed on WSL2.</span>
          </div>
        </div>
        <h1 ref="h1Ref">Portfolio</h1>
        <div></div>
        <span class="arrow-down" ref="arrDownRef"> &darr;</span>
      </div>
      <ul class="home__projects">
        <li v-for="(project, index) in projects" v-bind:key="index">
          <Project
            :name="project.name"
            :path="project.path"
            :techs="project.summary.techs"
            :desc="project.summary.desc[language]"
            :posterUrl="project.summary.posterUrl"
            :index="index"
          />
        </li>
      </ul>
      <Footer />
    </main>
  </div>
</template>

<script lang="ts">
import useLocomitive from '@/hooks/useLocomotive.vue';
import { GETTERS, useStore } from '@/store';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import Footer from '../components/Footer.vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Project from '../components/Project.vue';
import Title from '../components/Title.vue';
import { IProject } from '../data/projects';

export default defineComponent({
  name: 'Home',
  components: {
    LeaveAnimation,
    Title,
    Project,
    Footer,
  },
  props: {
    PROJECTS: {
      required: true,
      type: Array as PropType<Array<IProject>>,
    },
  },
  setup(props) {
    const { getters } = useStore();
    const h1Ref = ref<HTMLHeadingElement | null>(null);
    const arrDownRef = ref<HTMLSpanElement | null>(null);
    const language = computed(() => getters[GETTERS.GET_LANGUAGE]);

    const { scrollRef, ScrollTrigger } = useLocomitive();

    onMounted(() => {
      if (!scrollRef.value) return;
      const numbers = document.querySelectorAll('.project__number');
      const names = document.querySelectorAll('.project__name');
      const techs = document.querySelectorAll('.project__tech');
      const descs = document.querySelectorAll('.project__desc');

      numbers.forEach((number, index) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(number, {
          duration: 0.7,
          x: index % 2 === 0 ? -number.clientWidth * 2 : number.clientWidth * 2,
        });
        ScrollTrigger.create({
          trigger: number,
          start: 'bottom 90%',
          scroller: scrollRef.value,
          animation,
        });
      });

      names.forEach((name, index) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(name, {
          duration: 0.7,
          x: index % 2 === 0 ? -name.clientWidth * 2 : name.clientWidth * 2,
        });
        ScrollTrigger.create({
          trigger: name,
          start: 'bottom 90%',
          scroller: scrollRef.value,
          animation,
        });
      });

      techs.forEach((tech) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(tech, {
          duration: 0.7,
          opacity: 0,
          y: 20,
        });
        ScrollTrigger.create({
          trigger: tech,
          scroller: scrollRef.value,
          start: 'bottom 90%',
          animation,
        });
      });

      descs.forEach((desc) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(desc, {
          duration: 0.7,
          opacity: 0,
          y: 20,
        });
        ScrollTrigger.create({
          trigger: desc,
          scroller: scrollRef.value,
          start: 'top 90%',
          animation,
        });
      });

      if (h1Ref.value) {
        gsap.from(h1Ref.value, { duration: 1, delay: 1, x: -h1Ref.value.clientWidth - 5 });
      }

      if (arrDownRef.value) {
        gsap.from(arrDownRef.value, {
          duration: 1,
          delay: 2,
          opacity: 0,
          y: -20,
        });
      }
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 1000);
    });

    return {
      h1Ref,
      arrDownRef,
      scrollRef,
      projects: props.PROJECTS,
      count: props.PROJECTS.length,
      language,
    };
  },
});
</script>

<style lang="scss" scoped>
main {
  position: relative;
  padding-bottom: 10vh;
  .intro {
    @include mobile-23-desktop-2345__margins;
    height: 100vh;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    align-items: center;
    overflow-x: hidden;
    .intro__top {
      @media screen and (min-width: 1000px) {
        padding-left: $column-line-2-left;
      }
      padding-top: 2rem;
      display: grid;
      align-self: flex-start;
      grid-template-columns: 1fr 1fr;
      span {
        display: block;
        color: white;
        font-size: 0.7rem;
      }
      img {
        width: 1rem;
      }
    }
    h1 {
      @media screen and (min-width: 600px) {
        font-size: 6rem;
      }
      @media screen and (min-width: 1000px) {
        font-size: 9rem;
      }
      display: inline-block;
      width: 100%;
      color: white;
      font-size: 3rem;
      font-weight: 600;
      box-sizing: content-box;
    }
    .arrow-down {
      display: block;
      text-align: center;
      color: white;
      font-size: 3rem;
      opacity: 0.5;
    }
  }
  .home__projects {
    li {
      margin-bottom: 15rem;
    }
  }
}
</style>
