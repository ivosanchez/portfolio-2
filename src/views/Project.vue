<template>
  <LeaveAnimation />
  <Title :projectName="name" />
  <main ref="scrollRef" v-if="isValid">
    <section class="landing">
      <div class="hero-img__container">
        <img :src="getAsset(heroImgUrl)" ref="heroImgRef" />
      </div>
      <div class="heading">
        <h1 ref="nameRef">{{ name }}</h1>
      </div>
    </section>
    <Overview :overviews="overviews" :language="language" />
    <DetailTechs
      :techArrays="techArrays"
      :frontendGithubUrl="frontendGithubUrl"
      :backendGithubUrl="backendGithubUrl"
    />
    <section class="stacks__wrapper">
      <Stack
        v-for="(desc, index) in descs"
        :key="index"
        :desc="desc"
        :language="language"
        :index="index"
      />
    </section>
    <NextProject :nextName="nextName" :to="nextPath" />
    <Footer />
  </main>
  <div class="visit-btn__wrapper" v-if="isValid">
    <VisitButton :name="name" :href="href" />
  </div>
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import { IProject, PATH_KEY } from '@/data/projects';
import useLocomitive from '@/hooks/useLocomotive.vue';
import { GETTERS, useStore } from '@/store';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DetailTechs from '../components/DeatilTechs.vue';
import Footer from '../components/Footer.vue';
import NextProject from '../components/NextProject.vue';
import Overview from '../components/Overview.vue';
import Stack from '../components/Stack.vue';
import Title from '../components/Title.vue';
import VisitButton from '../components/VisitButton.vue';
import { getAsset } from '../utils';

export default defineComponent({
  name: 'Project',
  props: {
    PROJECTS: {
      required: true,
      type: Array as PropType<Array<IProject>>,
    },
  },
  components: {
    LeaveAnimation,
    Title,
    VisitButton,
    Overview,
    Stack,
    DetailTechs,
    NextProject,
    Footer,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const { getters } = useStore();

    const { scrollRef, ScrollTrigger } = useLocomitive();

    const language = computed(() => getters[GETTERS.GET_LANGUAGE]);
    const pathKey = computed(() => route.params.projectName as PATH_KEY);
    const state = reactive({
      project: props.PROJECTS.find((project) => project.path === pathKey.value),
    });

    const heroImgRef = ref<HTMLImageElement | null>(null);
    const nameRef = ref<HTMLHeadingElement | null>(null);

    if (!state.project) {
      router.push('/not/found');
    }

    onMounted(() => {
      if (!nameRef.value) return;
      const tl = gsap.timeline();
      tl.from(heroImgRef.value, {
        delay: 0.2,
        duration: 0.8,
        opacity: 0,
        y: '100px',
      });
      tl.from(nameRef.value, {
        duration: 0.8,
        x: -nameRef.value.getBoundingClientRect().right,
      });

      const visitBtnWrapper = document.querySelector('.visit-btn__wrapper');
      const visitBtnContainer = visitBtnWrapper?.querySelector('.visit-btn__container');
      const visitBtn = visitBtnContainer?.querySelector('.visit-btn');
      const visitBtnText = visitBtn?.querySelector('span');
      const visitBtnSvg = visitBtnContainer?.querySelector('svg');

      if (!scrollRef.value) return;
      if (visitBtnContainer && visitBtn && visitBtnText && visitBtnSvg) {
        const tl = gsap.timeline({ defaults: { duration: 0.6 } });
        tl.to(visitBtnText, { opacity: 0 });
        tl.to(
          visitBtnContainer,
          {
            position: 'absolute',
            top: '85vh',
            right: '2rem',
            padding: 0,
            width: 100,
            height: 100,
          },
          '-=0.4'
        );
        tl.to(
          visitBtn,
          {
            width: 0,
            height: 0,
            borderRadius: '50%',
          },
          '<'
        );
        tl.to(
          visitBtnSvg,
          {
            opacity: 1,
            pointerEvents: 'auto',
          },
          '-=0.3'
        );
        ScrollTrigger.create({
          trigger: visitBtnContainer,
          scroller: scrollRef.value,
          start: 'center 60%',
          toggleActions: 'play none none reverse',
          animation: tl,
          invalidateOnRefresh: true,
        });
      }

      const overviewContainer = document.querySelector('.overview__container');
      if (!overviewContainer) return;
      const overviewHeadings = overviewContainer.querySelectorAll('h5');
      const overviewParagraphs = overviewContainer.querySelectorAll('p');
      overviewHeadings.forEach((heading) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(heading, { duration: 1, x: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: heading,
          scroller: scrollRef.value,
          animation,
        });
      });
      overviewParagraphs.forEach((paragraph) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(paragraph, { duration: 1, y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: paragraph,
          scroller: scrollRef.value,
          animation,
        });
      });

      const techsContainers = document.querySelectorAll('.techs__container');

      if (!techsContainers) return;
      techsContainers.forEach((container) => {
        const techsUl = container?.querySelector('ul');
        const arrowBtn = container.querySelector('.arrow-btn');
        if (!techsUl || !arrowBtn) return;

        const lists = techsUl.querySelectorAll('li');
        lists.forEach((li) => {
          if (!techsUl || !li || !scrollRef.value) return;
          const animation = gsap.from(li, {
            opacity: 0,
            x: 100,
          });
          ScrollTrigger.create({
            trigger: li,
            scroller: scrollRef.value,
            animation,
          });
        });
        if (!arrowBtn || !scrollRef.value) return;
        const animation = gsap.from(arrowBtn, {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
        });
        ScrollTrigger.create({
          trigger: arrowBtn,
          scroller: scrollRef.value,
          animation,
        });
      });

      const stackContainers = document.querySelectorAll('.stack__container');
      stackContainers.forEach((stack) => {
        if (!scrollRef.value) return;

        const heading = stack.querySelector('h5');
        if (!heading) return;
        const headingAnim = gsap.from(heading, { duration: 1, x: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: heading,
          scroller: scrollRef.value,
          animation: headingAnim,
        });

        const paragraphs = stack.querySelectorAll('p');
        paragraphs.forEach((paragraph) => {
          if (!scrollRef.value) return;
          const pAnim = gsap.from(paragraph, { duration: 1, y: 50, opacity: 0 });
          ScrollTrigger.create({
            trigger: paragraph,
            scroller: scrollRef.value,
            animation: pAnim,
          });
        });
      });

      ScrollTrigger.refresh(true);
    });

    return {
      scrollRef,
      heroImgRef,
      nameRef,
      getAsset,
      language,
      isValid: Boolean(state.project),
      heroImgUrl: state.project?.detail.heroImgUrl,
      name: state.project?.name,
      href: state.project?.href,
      overviews: state.project?.detail.overviews,
      techArrays: state.project?.detail.backendTechs
        ? [state.project?.detail.frontendTechs, state.project?.detail.backendTechs]
        : [state.project?.detail.frontendTechs],
      frontendGithubUrl: state.project?.detail.frontendGithubUrl,
      backendGithubUrl: state.project?.detail.backendGithubUrl,
      descs: state.project?.detail.descs,
      nextPath: state.project?.nextPath,
      nextName: state.project?.nextPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.visit-btn__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
main {
  position: relative;
  .landing {
    height: 85vh;
  }
  .hero-img__container {
    @include mobile-23-desktop-2345__paddings;
    position: relative;
    opacity: 0.5;
    img {
      width: 100%;
      min-height: 300px;
      object-fit: cover;
      object-position: left;
    }
  }
  .heading {
    @include mobile-23-desktop-23456__margins;
    position: absolute;
    top: 30vh;
    padding: 2rem 0;
    overflow: hidden;
    h1 {
      @media screen and (min-width: 600px) {
        font-size: 6rem;
      }
      @media screen and (min-width: 1000px) {
        font-size: 9rem;
      }
      font-family: 'Playfair Display', serif;
      width: 100%;
      max-width: 1000px;
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
    }
  }

  .stacks__wrapper {
    @include mobile-23-desktop-2345__margins;
    display: grid;
    gap: 2rem;
  }
}
</style>
