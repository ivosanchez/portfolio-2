<template>
  <LeaveAnimation />

  <main ref="scrollRef">
    <section class="landing">
      <div class="hero-img__container">
        <img :src="getAsset(heroImgUrl)" ref="heroImgRef" />
      </div>
      <div class="heading">
        <h1 ref="nameRef">{{ name }}</h1>
      </div>
    </section>
    <Overview />
    <DetailTechs :techArrays="techArrays" />
    <section class="stacks__wrapper">
      <Stack v-for="(desc, index) in descs" :key="index" :desc="desc" :index="index" />
    </section>
    <ProjectFooter :nextName="nextName" :to="nextPath" />
  </main>
  <div class="visit-btn__wrapper">
    <VisitButton :name="name" />
  </div>
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import { IProject, PATH_KEY } from '@/constants/projects';
import useLocomitive from '@/hooks/useLocomotive.vue';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailTechs from '../components/DeatilTechs.vue';
import Overview from '../components/Overview.vue';
import ProjectFooter from '../components/ProjectFooter.vue';
import Stack from '../components/Stack.vue';
import VisitButton from '../components/VisitButton.vue';
import { getAsset } from '../utils';

export default defineComponent({
  name: 'Polartypes',
  props: { projects: { required: true, type: Map as PropType<Map<PATH_KEY, IProject>> } },
  components: {
    LeaveAnimation,
    VisitButton,
    Overview,
    Stack,
    DetailTechs,
    ProjectFooter,
  },
  setup(props) {
    const route = useRoute();
    const { scrollRef, ScrollTrigger } = useLocomitive();
    const projectName = computed(() => route.params.projectName as PATH_KEY);
    const state = reactive({ project: props.projects.get(projectName.value) });
    const heroImgRef = ref<HTMLImageElement | null>(null);
    const nameRef = ref<HTMLHeadingElement | null>(null);

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
          markers: true,
        });
      }

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

      ScrollTrigger.refresh(true);
    });

    return {
      scrollRef,
      heroImgRef,
      nameRef,
      getAsset,
      heroImgUrl: state.project?.detail.heroImgUrl,
      name: state.project?.name,
      techArrays: state.project?.detail.backendTechs
        ? [state.project?.detail.frontendTechs, state.project?.detail.backendTechs]
        : [state.project?.detail.frontendTechs],
      descs: state.project?.detail.descs,
      nextPath: state.project?.nextPath,
      nextName: state.project ? props.projects.get(state.project.nextPath)?.name : '',
    };
  },
});
</script>

<style lang="scss" scoped>
.landing {
  height: 85vh;
}
.visit-btn__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
.hero-img__container {
  @include mobile-23-desktop-3456__margins;
  position: relative;
  opacity: 0.7;
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
  h1 {
    @media screen and (min-width: 600px) {
      font-size: 6rem;
    }
    @media screen and (min-width: 1000px) {
      font-size: 9rem;
    }
    width: 100%;
    max-width: 1000px;
    text-shadow: 1px 1px 200px black;
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
</style>
