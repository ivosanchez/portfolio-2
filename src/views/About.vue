<template>
  <LeaveAnimation />
  <Title />
  <article class="about__text-container">
    <p ref="paragraphRef"></p>
  </article>
  <main ref="scrollRef">
    <div class="about__panel" v-for="(panel, index) in ABOUT_PANELS" :key="index">
      <img v-if="panel.bgUrl" class="about__bg" :src="getAsset(panel.bgUrl)" />
    </div>
    <Me />
  </main>
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import { IAboutPanel } from '@/data';
import useLocomitive from '@/hooks/useLocomotive.vue';
import useShuffleString from '@/hooks/useShuffleString.vue';
import { GETTERS, TLanguage, useStore } from '@/store';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Title from '../components/Title.vue';
import Me from '../components/Me.vue';
import { getAsset } from '../utils';

export default defineComponent({
  components: {
    LeaveAnimation,
    Title,
    Me,
  },
  props: { ABOUT_PANELS: { required: true, type: Array as PropType<Array<IAboutPanel>> } },
  setup(props) {
    const { getters } = useStore();
    const routeName = useRoute().name;
    const language = computed<TLanguage>(() => getters[GETTERS.GET_LANGUAGE]);
    const paragraphRef = ref<HTMLParagraphElement | null>(null);
    const pannelIndex = ref<number | null>(0);

    const { scrollRef, ScrollTrigger } = useLocomitive();

    const { shuffleString } = useShuffleString();

    watch(
      () => getters[GETTERS.GET_LANGUAGE],
      async () => {
        if (!paragraphRef.value) return;
        if (pannelIndex.value === null) {
          await shuffleString(
            paragraphRef.value,
            language.value === 'ko' ? '방진석' : 'Jinseok Bang',
            true
          );
          return;
        }
        await shuffleString(
          paragraphRef.value,
          props.ABOUT_PANELS[pannelIndex.value].text[language.value],
          true
        );
      }
    );

    onMounted(() => {
      const panels = document.querySelectorAll('.about__panel');
      panels.forEach((panel, i) => {
        const image = panel.querySelector<HTMLImageElement>('.about__bg');
        if (!scrollRef.value || !image) return;
        const tl = gsap.timeline({ defaults: { ease: 'none' } });
        tl.fromTo(
          image,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(30% 0% 30% 0%)' }
        );
        tl.fromTo(
          image,
          { clipPath: 'inset(30% 0% 30% 0%)' },
          { clipPath: 'inset(0% 0% 100% 0%)' }
        );
        ScrollTrigger.create({
          trigger: panel,
          scroller: scrollRef.value,
          animation: tl,
          scrub: true,
          pin: true,
          pinSpacing: false,
          onEnter: async () => {
            if (!paragraphRef.value) return;
            pannelIndex.value = i;
            await shuffleString(
              paragraphRef.value,
              props.ABOUT_PANELS[i].text[language.value],
              true
            );
          },
          onEnterBack: async () => {
            if (!paragraphRef.value) return;
            pannelIndex.value = i;
            await shuffleString(
              paragraphRef.value,
              props.ABOUT_PANELS[i].text[language.value],
              true
            );
          },
        });
      });

      const meWrapper = document.querySelector('.me__wrapper');
      if (!meWrapper || !scrollRef.value) return;
      const meCircles = meWrapper.querySelectorAll('.me__circle');
      const circlesAnim = gsap
        .from(meCircles, {
          duration: 1.5,
          delay: 0.8,
          opacity: 0,
          stagger: 0.8,
        })
        .pause();
      ScrollTrigger.create({
        trigger: meWrapper,
        start: '41% center',
        end: '41% center',
        scroller: scrollRef.value,
        onEnter: async () => {
          pannelIndex.value = null;
          await shuffleString(
            paragraphRef.value,
            language.value === 'ko' ? '방진석' : 'Jinseok Bang',
            true
          );
          circlesAnim.play();
        },
        onEnterBack: async () => {
          if (!paragraphRef.value) return;
          pannelIndex.value = panels.length - 1;
          await shuffleString(
            paragraphRef.value,
            props.ABOUT_PANELS[panels.length - 1].text[language.value],
            true
          );
        },
      });

      gsap.from(paragraphRef.value, { duration: 1, delay: 1.8, opacity: 0 });

      setTimeout(() => ScrollTrigger.refresh(true), 1000);
    });

    return { routeName, scrollRef, paragraphRef, getAsset, language };
  },
});
</script>

<style lang="scss" scoped>
.about__text-container {
  @include mobile-23-desktop-2345__paddings;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 10;
  transform: translateY(-50%);
  width: 100%;
  pointer-events: none;
  p {
    text-align: center;
    color: white;
    font-weight: 300;
    font-size: $font-size-m;
    line-height: 1.5em;
  }
}
main {
  overflow: hidden !important;
  position: relative;
  .about__cushion {
    height: 10vh;
  }
  .about__panel {
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      height: 100%;
      filter: brightness(60%);
      object-fit: cover;
      clip-path: inset(100% 0% 0% 0%);
    }
  }
}
</style>
