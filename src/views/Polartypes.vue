<template>
  <LeaveAnimation />

  <main v-if="!isLoading" ref="scrollRef">
    <section class="landing">
      <div class="hero-img-container">
        <img src="@/assets/polartypes/screenshot.png" ref="heroImgRef" />
      </div>
      <div class="heading">
        <h1 ref="nameRef">Polartypes</h1>
      </div>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Polartypes and Polarsteps</h3>
      <p>
        Polarsteps는 전세계의 여행자들과 모험가들을 위한 소셜 네트워크 서비스를 제공하고 있어요.
        자바스크립트를 처음 배울 때부터 꼭 클론코딩을 해보고자 마음 먹었던 곳이에요. 그래서 저에겐
        다른 프로젝트들보다도 더 의미가 깊어요.
      </p>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Frontend</h3>
      <p>
        React를 사용해서
      </p>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Backend</h3>
      <p>
        단순히 눈에 보이는 것만 클론코딩 한 것이 아니에요. Nestjs와 GraphQL을 사용해서 Account,
        Trip, Step 그리고 Comment까지 CRUD를 구축했어요.
      </p>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Typescript</h3>
      <p>
        프론트와 백엔드 모두에 typescript를 사용했어요.
      </p>
    </section>
    <DetailTechs
      :scrollRef="scrollRef"
      :isFront="true"
      :techs="['React', 'Apollo', 'Moment', 'Mapbox', 'TailwindCSS']"
    />
    <DetailTechs
      :scrollRef="scrollRef"
      :isFront="false"
      :techs="['NestJS', 'GraphQL', 'TypeORM', 'PostgreSQL', 'Jest']"
    />
    <ProjectFooter nextName="DjangoEats" to="django-eats" />
  </main>
  <div class="visit-btn__wrapper">
    <VisitButton :scrollRef="scrollRef" projectName="Polartypes" />
  </div>
  <AsideLeft />
  <AsideRight />
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import useLocomitive from '@/hooks/useLocomotive.vue';
import gsap from 'gsap';
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue';
import VisitButton from '../components/VisitButton.vue';
import AsideLeft from '../components/AsideLeft.vue';
import AsideRight from '../components/AsideRight.vue';
import DetailTechs from '../components/DeatilTechs.vue';
import ProjectFooter from '../components/ProjectFooter.vue';

export default defineComponent({
  name: 'Polartypes',
  components: { LeaveAnimation, AsideLeft, AsideRight, VisitButton, DetailTechs, ProjectFooter },
  setup() {
    const { scrollRef } = useLocomitive();
    const isLoading = ref(true);
    const heroImgRef = ref<HTMLImageElement | null>(null);
    const nameRef = ref<HTMLHeadingElement | null>(null);

    onMounted(async () => {
      const img = new Image();
      img.src = require('@/assets/polartypes/screenshot.png');
      img.onload = () => {
        isLoading.value = false;
      };
    });

    watch(
      () => isLoading.value,
      () => {
        if (isLoading.value) return;
        nextTick(() => {
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
        });
      }
    );

    return { isLoading, scrollRef, heroImgRef, nameRef };
  },
});
</script>

<style lang="scss" scoped>
.visit-btn__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
.landing {
  height: 100vh;
  .hero-img-container {
    @include mobile-23-desktop-345__paddings;
    padding-top: 7rem;
    margin-bottom: -5rem;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .heading {
    overflow: hidden;
    padding-bottom: 5rem;
    @include mobile-23-desktop-2345__margins;
    h1 {
      @media screen and (min-width: 1000px) {
        font-size: 8rem;
      }
      width: 100%;
      text-shadow: 1px 1px 50px black;
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
    }
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
