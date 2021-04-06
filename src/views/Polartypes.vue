<template>
  <LeaveAnimation />

  <main ref="scrollRef">
    <section class="landing">
      <div class="hero-img-container">
        <img src="@/assets/polartypes/screenshot.png" ref="heroImgRef" />
      </div>
      <div class="heading">
        <h1 ref="nameRef">Polartypes</h1>
      </div>
    </section>
    <Overview />
    <Stack />
    <section class="desc__container">
      <div class="break" />
      <h3>Typescript</h3>
      <p>
        프론트와 백엔드 모두에 typescript를 사용했어요.
      </p>
    </section>
    <DetailTechs
      :isFront="true"
      :techs="['React', 'Apollo', 'Moment Timezone', 'Mapbox', 'TailwindCSS']"
    />
    <DetailTechs :isFront="false" :techs="['NestJS', 'GraphQL', 'TypeORM', 'PostgreSQL', 'Jest']" />
    <ProjectFooter nextName="DjangoEats" to="django-eats" />
  </main>
  <div class="visit-btn__wrapper">
    <VisitButton projectName="Polartypes" />
  </div>
  <AsideLeft />
  <AsideRight />
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import useLocomitive from '@/hooks/useLocomotive.vue';
import gsap from 'gsap';
import { defineComponent, onMounted, ref } from 'vue';
import AsideLeft from '../components/AsideLeft.vue';
import AsideRight from '../components/AsideRight.vue';
import DetailTechs from '../components/DeatilTechs.vue';
import Overview from '../components/Overview.vue';
import ProjectFooter from '../components/ProjectFooter.vue';
import Stack from '../components/Stack.vue';
import VisitButton from '../components/VisitButton.vue';

export default defineComponent({
  name: 'Polartypes',
  components: {
    LeaveAnimation,
    AsideLeft,
    AsideRight,
    VisitButton,
    Overview,
    Stack,
    DetailTechs,
    ProjectFooter,
  },
  setup() {
    const { scrollRef, ScrollTrigger } = useLocomitive();
    const heroImgRef = ref<HTMLImageElement | null>(null);
    const nameRef = ref<HTMLHeadingElement | null>(null);

    onMounted(() => {
      if (!nameRef.value) return;
      const tl = gsap.timeline();
      tl.from(heroImgRef.value, {
        duration: 0.4,
        opacity: 0,
        y: '100px',
      });
      tl.from(
        nameRef.value,
        {
          duration: 1,
          x: -nameRef.value.getBoundingClientRect().right,
        },
        '+=0.5'
      );

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

    return { scrollRef, heroImgRef, nameRef };
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
.hero-img-container {
  @include mobile-23-desktop-3456__paddings;
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
  top: 35vh;
  padding: 2rem 0;
  h1 {
    @media screen and (min-width: 600px) {
      font-size: 6rem;
    }
    @media screen and (min-width: 1000px) {
      font-size: 9rem;
    }
    width: 100%;
    text-shadow: 1px 1px 50px black;
    color: white;
    font-size: 2.5rem;
    font-weight: 600;
  }
}

.desc__container {
  padding-bottom: 15vh;
  @include mobile-23-desktop-23__margins;
  color: white;
  .break {
    width: 100%;
    height: 1px;
    background-color: white;
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  p {
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1.2rem;
  }
}
</style>
