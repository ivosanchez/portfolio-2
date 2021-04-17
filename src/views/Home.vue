<template>
  <LeaveAnimation />
  <Title />
  <main ref="scrollRef">
    <div class="intro">
      <div class="intro__top" ref="introTopRef">
        <div class="intro__top__row">
          <span>Optimized for Google Chrome.</span>
        </div>
        <div class="intro__top__row">
          <span>There are {{ count }} projects.</span>
          <span>Developed on WSL2.</span>
        </div>
      </div>
      <h1 ref="h1Ref">I make your ideas alive on the web</h1>
      <div></div>
      <div class="arrow-down" ref="arrDownRef">
        <span>&darr;</span>
      </div>
    </div>
    <ul class="home__projects">
      <li v-for="(project, index) in projects" v-bind:key="index">
        <Project
          :name="project.name"
          :path="project.path"
          :techs="project.summary.techs"
          :desc="project.summary.desc[language]"
          :videoSrc="project.summary.videoSrc"
          :posterUrl="project.summary.posterUrl"
          :index="index"
        />
      </li>
    </ul>
    <Footer />
  </main>
  <CustomCursor />
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
import CustomCursor from '../components/CustomCursor.vue';
import { DELAY_1, DELAY_2, DELAY_3_HALF } from '../constants/gsap';
import { IProject } from '../data/projects';

export default defineComponent({
  name: 'Home',
  components: {
    LeaveAnimation,
    Title,
    Project,
    Footer,
    CustomCursor,
  },
  props: {
    PROJECTS: {
      required: true,
      type: Array as PropType<Array<IProject>>,
    },
  },
  setup(props) {
    const { getters } = useStore();
    const introTopRef = ref<HTMLDivElement | null>(null);
    const h1Ref = ref<HTMLHeadingElement | null>(null);
    const arrDownRef = ref<HTMLSpanElement | null>(null);
    const language = computed(() => getters[GETTERS.GET_LANGUAGE]);

    const { scrollRef, ScrollTrigger } = useLocomitive();

    const scrollTriggerRevealFromSide = (element: HTMLElement, index: number) => {
      if (!scrollRef.value) return;
      const animation = gsap.from(element, {
        duration: 0.7,
        x: index % 2 === 0 ? -element.clientWidth * 2 : element.clientWidth * 2,
      });
      ScrollTrigger.create({
        trigger: element,
        start: 'bottom 90%',
        scroller: scrollRef.value,
        animation,
      });
    };

    const scrollTriggerRevealByOpacity = (element: HTMLElement) => {
      if (!scrollRef.value) return;
      const animation = gsap.from(element, {
        duration: 0.7,
        opacity: 0,
        y: 20,
      });
      ScrollTrigger.create({
        trigger: element,
        scroller: scrollRef.value,
        start: 'bottom 90%',
        animation,
      });
    };

    onMounted(() => {
      if (!scrollRef.value) return;
      const numbers = scrollRef.value.querySelectorAll<HTMLElement>('.project__number');
      const names = scrollRef.value.querySelectorAll<HTMLElement>('.project__name');

      const techs = scrollRef.value.querySelectorAll<HTMLElement>('.project__tech');
      const descs = scrollRef.value.querySelectorAll<HTMLElement>('.project__desc');

      numbers.forEach(scrollTriggerRevealFromSide);
      names.forEach(scrollTriggerRevealFromSide);

      techs.forEach(scrollTriggerRevealByOpacity);
      descs.forEach(scrollTriggerRevealByOpacity);

      if (introTopRef.value) {
        const spans = introTopRef.value.querySelectorAll('.intro__top__row');
        spans.forEach((span) => {
          gsap.from(span, { duration: 2, delay: DELAY_3_HALF, width: 0, whiteSpace: 'nowrap' });
        });
      }

      if (h1Ref.value) {
        gsap.from(h1Ref.value, { duration: 1, delay: DELAY_1, x: -h1Ref.value.clientWidth - 5 });
      }

      if (arrDownRef.value) {
        gsap.from(arrDownRef.value, {
          duration: 1,
          delay: DELAY_2,
          opacity: 0,
        });
      }
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 1000);
    });

    return {
      h1Ref,
      introTopRef,
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
    overflow: hidden;
    .intro__top {
      @media screen and (min-width: 1024px) {
        padding-left: $column-line-2-left;
      }
      padding-top: 2rem;
      display: grid;
      align-self: flex-start;
      grid-template-columns: 1fr 1fr;
      .intro__top__row {
        overflow: hidden;
        span {
          display: block;
          color: white;
          font-size: 0.7rem;
        }
      }
    }
    h1 {
      @media screen and (min-width: 600px) {
        font-size: 4rem;
      }
      @media screen and (min-width: 1024px) {
        font-size: 6rem;
      }
      display: inline-block;
      color: $primary;
      font-size: 2rem;
      font-weight: 600;
      box-sizing: content-box;
    }
    .arrow-down {
      width: 100%;
      display: flex;
      justify-content: center;
      color: white;
      font-size: 3rem;
      opacity: 0.5;
    }
  }
  .home__projects {
    li {
      margin-bottom: clamp(1rem, 30vw, 15rem);
    }
  }
}
</style>
