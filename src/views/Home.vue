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
      <div class="intro__heading-container" ref="headingContainerRef">
        <div>
          <h1 class="intro__heading__secondary">I can help you</h1>
        </div>
        <div>
          <h1 class="intro__heading__secondary">to cultivate</h1>
        </div>
        <h1>
          <span class="intro__heading__primary">Solid </span>
          <span class="intro__heading__primary">Web </span>
          <span class="intro__heading__primary">Service</span>
        </h1>
      </div>
      <div class="intro__desc" ref="descRef">
        <div>
          <span>{{
            language === 'ko'
              ? '안녕하세요! 저는 웹 개발자 방진석이에요.'
              : "Hello! I'm web developer Jinseok Bang."
          }}</span>
        </div>
        <div>
          <span>{{
            language === 'ko' ? '제 포트폴리오에 오신 걸 환영해요.' : 'Welcome to my portfolio.'
          }}</span>
        </div>
        <div>
          <span>{{
            language === 'ko'
              ? '스크롤해서 제가 뭘 할 수 있는지 봐주세요.'
              : 'Scroll down and see what I can do.'
          }}</span>
        </div>
      </div>
      <div class="intro__arrow-down" ref="arrDownRef">
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
import CustomCursor from '../components/CustomCursor.vue';
import Footer from '../components/Footer.vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Project from '../components/Project.vue';
import Title from '../components/Title.vue';
import { DELAY_3_HALF } from '../constants/gsap';
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
    const headingContainerRef = ref<HTMLHeadingElement | null>(null);
    const descRef = ref<HTMLDivElement | null>(null);
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
          gsap.from(span, {
            duration: 1,
            delay: DELAY_3_HALF,
            clipPath: 'inset(0% 0% 0% 100%)',
          });
        });
      }

      if (headingContainerRef.value) {
        const secondaries = headingContainerRef.value.querySelectorAll<HTMLHeadingElement>(
          '.intro__heading__secondary'
        );
        const primaryParts = headingContainerRef.value.querySelectorAll<HTMLSpanElement>(
          '.intro__heading__primary'
        );
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        tl.from(secondaries, {
          clipPath: 'inset(0% 100% 0% 0%)',
          stagger: 0.5,
        });
        tl.from(primaryParts, { duration: 1.2, clipPath: 'inset(100% 0% 0% 0%)' }, '+=0.5');
      }

      if (descRef.value) {
        const descParts = descRef.value.querySelectorAll('span');
        gsap.from(descParts, {
          duration: 1,
          delay: DELAY_3_HALF,
          clipPath: 'inset(0% 100% 0% 0%)',
        });
      }

      if (arrDownRef.value) {
        gsap.from(arrDownRef.value, {
          duration: 1,
          delay: DELAY_3_HALF,
          opacity: 0,
        });
      }

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 1000);
    });

    return {
      headingContainerRef,
      introTopRef,
      descRef,
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
    height: 100vh;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    overflow: hidden;
    .intro__top {
      @include mobile-23-desktop-45__margins;
      padding-top: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .intro__top__row {
        span {
          display: block;
          color: white;
          font-size: 0.7rem;
        }
      }
    }
    .intro__heading-container {
      @include mobile-23-desktop-2345__paddings;
      display: flex;
      flex-direction: column;
      .intro__heading__secondary {
        display: inline;
        font-size: $font-size-m;
        line-height: 1.4em;
        font-weight: 400;
        box-sizing: content-box;
        color: white;
      }
      .intro__heading__primary {
        margin-top: 1rem;
        line-height: 1em;
        color: $primary;
        font-size: $font-size-xl;
        font-weight: 600;
      }
    }
    .intro__desc {
      @include mobile-23-desktop-45__paddings;
      align-self: center;
      span {
        display: inline-block;
        color: white;
        font-size: $font-size-xs;
        line-height: 1.2em;
        font-weight: 300;
      }
    }
    .intro__arrow-down {
      width: 100%;
      align-self: center;
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
