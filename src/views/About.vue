<template>
  <LeaveAnimation />
  <Title />
  <article class="about__text-container">
    <p ref="paragraphRef">
      안녕하세요. 여러분은 지금 개발자가 되고자 하는 비전공 무경력자의 포트폴리오를 보고 있어요.
      만약 여기서 창을 닫지 않았다면 계속 읽어주세요.
    </p>
  </article>
  <main ref="scrollRef">
    <article class="about__pannels-wrapper" ref="pannelsRef">
      <section class="about__panel" v-for="(panel, index) in ABOUT_PANELS" :key="index">
        <img v-if="panel.bgUrl" :src="getAsset(panel.bgUrl)" />
        <div class="about__img-overlay">
          <ColumnLines />
          <div class="about__img-desc" v-html="panel.bgDesc"></div>
          <div v-if="index === ABOUT_PANELS.length - 1" class="about__last-panel__container">
            <span>Hello World</span>
          </div>
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
import gsap from 'gsap';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useRoute } from 'vue-router';
import ColumnLines from '../components/ColumnLines.vue';
import Footer from '../components/Footer.vue';
import Title from '../components/Title.vue';
import { getAsset } from '../utils';

export default defineComponent({
  components: { LeaveAnimation, Title, ColumnLines, Footer },
  props: { ABOUT_PANELS: { required: true, type: Array as PropType<Array<IAboutPanel>> } },
  setup(props) {
    const paragraphRef = ref<HTMLParagraphElement | null>(null);
    const pannelsRef = ref<HTMLDivElement | null>(null);
    const routeName = useRoute().name;

    const { scrollRef, ScrollTrigger } = useLocomitive();

    const { shuffleString } = useShuffleString();

    onMounted(() => {
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
        // const overlayAnim = gsap.to(overlay, { yPercent: '-100', ease: 'none' });
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
          start: `top +=${window.innerHeight * 0.75}`,
          end: `top +=${window.innerHeight * 0.75}`,
          scroller: scrollRef.value,
          markers: true,
          toggleActions: 'play reverse play reverse',
          onEnter: async () => {
            if (i !== 0) {
              await shuffleString(paragraphRef.value, props.ABOUT_PANELS[i].text, true);
            }
          },
          onEnterBack: async () =>
            shuffleString(paragraphRef.value, props.ABOUT_PANELS[Math.max(0, i - 1)].text, true),
        });
      });

      gsap.from(paragraphRef.value, { duration: 1, delay: 1.8, opacity: 0 });

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 1000);
    });

    return { routeName, scrollRef, paragraphRef, pannelsRef, getAsset };
  },
});
</script>

<style lang="scss" scoped>
.about__text-container {
  @include mobile-23-desktop-2345__margins;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 10;
  transform: translateY(-50%);
  pointer-events: none;
  p {
    @media screen and (min-width: 1000px) {
      font-size: 2rem;
      line-height: 3.5rem;
    }
    color: white;
    margin-bottom: 5rem;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 2rem;
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
        @media screen and (min-width: 1000px) {
          display: inline-block;
        }
        display: none;
        position: absolute;
        bottom: -3rem;
        left: $column-line-5-left;
        font-size: 0.8rem;
        opacity: 0.8;
        color: white;
      }
    }
    .about__last-panel__container {
      @include mobile-23-desktop-2345__margins;
      height: 100vh;
    }
  }
}
</style>
