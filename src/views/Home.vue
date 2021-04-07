<template>
  <LeaveAnimation />
  <main ref="scrollRef">
    <div class="intro">
      <h1 ref="h1Ref">Portfolio</h1>
      <span class="arrow-down" ref="arrDownRef">
        &darr;
      </span>
    </div>
    <ul>
      <li v-for="(project, index) in projects" v-bind:key="index">
        <Project
          :name="project.name"
          :path="project.path"
          :techs="project.summary.techs"
          :posterUrl="project.summary.posterUrl"
          :desc="project.summary.desc"
          :index="index"
        />
      </li>
    </ul>
    <footer class="home__footer">
      <div class="home__footer-left">
        <div><span>Built with&nbsp;</span><img src="@/assets/logo.png" /></div>
      </div>
      <div class="home__footer-right">
        <span>Copyright &copy; Jinseok Bang</span>
      </div>
    </footer>
  </main>
  <AsideLeft />
  <AsideRight />
</template>

<script lang="ts">
import useLocomitive from '@/hooks/useLocomotive.vue';
import gsap from 'gsap';
import { defineComponent, onMounted, ref } from 'vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Project from '../components/Project.vue';
import { projects } from '../constants/projects';
import AsideLeft from '../components/AsideLeft.vue';
import AsideRight from '../components/AsideRight.vue';

export default defineComponent({
  name: 'Home',
  components: { LeaveAnimation, Project, AsideLeft, AsideRight },
  setup() {
    const h1Ref = ref<HTMLHeadingElement | null>(null);
    const arrDownRef = ref<HTMLSpanElement | null>(null);

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
      }, 100);
    });

    return { h1Ref, arrDownRef, scrollRef, projects: projects.values() };
  },
});
</script>

<style lang="scss" scoped>
.intro {
  @include mobile-23-desktop-2345__margins;
  height: 100vh;
  padding-top: 30vh;
  padding-bottom: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
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
.home__footer {
  @include mobile-23-desktop-34__margins;
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .home__footer-left {
    div {
      display: flex;
      align-items: center;
    }
  }
  .home__footer-right {
    padding-top: 2rem;
  }
  span {
    font-size: 0.8rem;
    color: white;
    letter-spacing: 1px;
  }
  img {
    width: 1rem;
  }
}
</style>
