<template>
  <LeaveAnimation />
  <Title />
  <article class="about__text-container">
    <p ref="paragraphRef"></p>
  </article>
  <main ref="scrollRef">
    <article class="about__pannels-wrapper" ref="pannelsRef">
      <section class="about__panel" v-for="(panel, index) in ABOUT_PANELS" :key="index">
        <img v-if="panel.bgUrl" :src="getAsset(panel.bgUrl)" />
        <div class="about__img-overlay">
          <ColumnLines />
          <div class="about__img-desc" v-html="panel.bgDesc[language]"></div>
          <Me v-if="index === ABOUT_PANELS.length - 1" />
        </div>
      </section>
    </article>
    <Footer />
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
import ColumnLines from '../components/ColumnLines.vue';
import Footer from '../components/Footer.vue';
import Title from '../components/Title.vue';
import Me from '../components/Me.vue';
import { getAsset } from '../utils';

export default defineComponent({
  components: { LeaveAnimation, Title, ColumnLines, Me, Footer },
  props: { ABOUT_PANELS: { required: true, type: Array as PropType<Array<IAboutPanel>> } },
  setup(props) {
    const { getters } = useStore();
    const routeName = useRoute().name;
    const language = computed<TLanguage>(() => getters[GETTERS.GET_LANGUAGE]);
    const paragraphRef = ref<HTMLParagraphElement | null>(null);
    const pannelsRef = ref<HTMLDivElement | null>(null);
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

    onMounted(async () => {
      if (!paragraphRef.value) return;
      paragraphRef.value.innerText = props.ABOUT_PANELS[0].text[language.value];

      if (!pannelsRef.value) return;
      const panels = pannelsRef.value.querySelectorAll('.about__panel');
      panels.forEach((panel, i) => {
        if (!scrollRef.value) return;
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
          scroller: scrollRef.value,
          pin: true,
          pinSpacing: false,
        });

        const overlay = panel.querySelector('.about__img-overlay');
        if (!overlay) return;

        const overlayAnim = gsap.to(overlay, { yPercent: '-100', ease: 'power2' });
        ScrollTrigger.create({
          trigger: overlay,
          animation: overlayAnim,
          start: 'top top',
          end: 'bottom top',
          scroller: scrollRef.value,
          scrub: 0,
        });

        ScrollTrigger.create({
          trigger: panels[i],
          start: `top +=${window.innerHeight * 0.8}`,
          end: `top +=${window.innerHeight * 0.8}`,
          scroller: scrollRef.value,
          toggleActions: 'play reverse play reverse',
          onEnter: async () => {
            if (i !== 0) {
              await shuffleString(
                paragraphRef.value,
                props.ABOUT_PANELS[i].text[language.value],
                true
              );
              pannelIndex.value = i;
            }
          },
          onEnterBack: async () => {
            shuffleString(
              paragraphRef.value,
              props.ABOUT_PANELS[Math.max(0, i - 1)].text[language.value],
              true
            );
            pannelIndex.value = i - 1;
          },
        });
      });

      const meWrapper = pannelsRef.value.querySelector('.me__wrapper');
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
        start: '40% center',
        end: '40% center',
        scroller: scrollRef.value,
        toggleActions: 'play none none reverse',
        onEnter: async () => {
          await shuffleString(
            paragraphRef.value,
            language.value === 'ko' ? '방진석' : 'Jinseok Bang',
            true
          );
          circlesAnim.restart(true);
          pannelIndex.value = null;
        },
        onEnterBack: () => {
          shuffleString(
            paragraphRef.value,
            props.ABOUT_PANELS[props.ABOUT_PANELS.length - 1].text[language.value],
            true
          );
          circlesAnim.reverse();
          pannelIndex.value = props.ABOUT_PANELS.length - 1;
        },
      });

      gsap.from(paragraphRef.value, { duration: 1, delay: 1.8, opacity: 0 });

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 1000);
    });

    return { routeName, scrollRef, paragraphRef, pannelsRef, getAsset, language };
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
  overflow-y: hidden !important;
  position: relative;
}
.about__pannels-wrapper {
  .about__panel {
    position: relative;
    height: 100vh;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      z-index: 0;
      filter: brightness(50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .about__img-overlay {
      width: 100%;
      height: 100%;
      background-color: black;
      span {
        color: white;
      }
      .about__img-desc {
        @media screen and (min-width: 1024px) {
          display: grid;
          gap: 1rem;
        }
        display: none;
        position: absolute;
        top: 102%;
        left: $column-line-5-left;
        font-size: 0.8rem;
        opacity: 0.8;
        color: white;
      }
    }
  }
}
</style>
