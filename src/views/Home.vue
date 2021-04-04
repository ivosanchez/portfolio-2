<template>
  <LeaveAnimation />
  <main ref="scrollRef">
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Project from '../components/Project.vue';
import { projects } from '../constants/projects';

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: 'Home',
  components: { Project, LeaveAnimation },
  setup() {
    const scrollRef = ref<HTMLDivElement | null>(null);
    const h1Ref = ref<HTMLHeadingElement | null>(null);
    const locoScroll = ref();

    const onRefresh = () => locoScroll.value.update();

    // setTimeout(() => locoScroll.value.update(), 1000);

    onMounted(() => {
      if (!scrollRef.value) return;
      locoScroll.value = new LocomotiveScroll({
        el: scrollRef.value,
        smooth: true,
      });
      locoScroll.value.on('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(scrollRef.value, {
        scrollTop(value) {
          if (arguments.length) {
            return locoScroll.value.scrollTo(value, 0, 0);
          }
          return locoScroll.value.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollRef.value.style.transform ? 'transform' : 'fixed',
      });

      const numbers = document.querySelectorAll('.project__number');
      const names = document.querySelectorAll('.project__name');
      const techs = document.querySelectorAll('.project__tech');

      numbers.forEach((number, index) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(number, {
          duration: 0.5,
          x: index % 2 === 0 ? -number.clientWidth * 2 : number.clientWidth * 2,
        });
        ScrollTrigger.create({
          trigger: number,
          start: 'bottom 90%',
          scroller: scrollRef.value,
          markers: true,
          animation,
        });
      });

      names.forEach((name, index) => {
        if (!scrollRef.value) return;
        const animation = gsap.from(name, {
          duration: 0.5,
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
          duration: 0.4,
          opacity: 0,
          y: 20,
        });
        ScrollTrigger.create({
          trigger: tech,
          scroller: scrollRef.value,
          start: 'bottom 90%',
          end: 'top center',
          scrub: 1,
          animation,
        });
      });

      ScrollTrigger.addEventListener('refresh', onRefresh);
      ScrollTrigger.refresh(true);

      if (h1Ref.value) {
        const tl = gsap.timeline();
        tl.from(h1Ref.value, { duration: 1, delay: 1, x: -h1Ref.value.clientWidth - 5 });
      }
    });

    onUnmounted(() => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      if (!locoScroll.value) return;
      locoScroll.value.destroy();
    });
    return { h1Ref, scrollRef, projects };
  },
});
</script>

<style lang="scss" scoped>
.intro {
  height: 100vh;
  padding-top: 30vh;
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
