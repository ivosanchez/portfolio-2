<template>
  <LeaveAnimation />
  <main>
    <article class="about__text-container">
      <p ref="paragraphRef">
        안녕하세요. 여러분은 지금 개발자가 되고자 하는 비전공 무경력자의 포트폴리오를 보고 있어요.
        만약 여기서 창을 닫지 않았다면 계속 읽어주세요.
      </p>
    </article>
    <article class="about__pannels-wrapper" ref="pannelsRef">
      <section class="about__panel" v-for="(panel, index) in aboutPanels" :key="index">
        <img :src="getAsset(panel.bgUrl)" />
        <div class="about__img-overlay">
          <ColumnLines />
        </div>
      </section>
    </article>
    <!-- <p>
        저는 대학에서 역사를 공부했어요. 누군가 그러더군요, 이 전공으로는 고대 그리스에서나 취직이
        가능하다고. 경영학도 복수전공을 했어요. 하지만 그렇게 궁합이 좋진 못했어요. 그런데 막상
        성적은 경영학 수업을 들을 때가 가장 좋았어요. 장학금도 타고요. 아이러니 하네요.
      </p>
      <p class="welding">
        저의 첫번째 직업은 용접사였어요. 그 이전에도 하던 몇가지 하던 일이 있었지만 직업으로 칠 수 있을지 모르겠네요.
      </p>
      <p class="barista">
        두번째 직업은 바리스타였어요. 프랜차이즈 커피 전문점 부점장이었죠.
      </p>
      <p class="bicycle">
        그리고 자전거로 서울에서 모로코까지 갔다 왔어요. 2년이 걸렸고,
      </p>
      <p>
        그런데 어깨를 다쳐서 예전에 하던 일을 할 수 없게 됐어요. 그래서 웹개발을 하게 됐어요. 키보드
        치는건 어깨가 안 아프더라고요. 프로그래밍에 대한 열정, 사랑, 이런 거 없었어요. 그냥 먹고 살
        길은 있어야 겠으니까 시작했어요. 그런데 나쁘지 않아요. 재미있어요.
      </p> -->
  </main>
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import { IAboutPanel } from '@/constants/about';
import useShuffleString from '@/hooks/useShuffleString.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import ColumnLines from '../components/ColumnLines.vue';
import { getAsset } from '../utils';

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  components: { LeaveAnimation, ColumnLines },
  props: { aboutPanels: { required: true, type: Array as PropType<IAboutPanel[]> } },
  setup(props) {
    const paragraphRef = ref<HTMLParagraphElement | null>(null);
    const pannelsRef = ref<HTMLDivElement | null>(null);

    const { shuffleString } = useShuffleString();

    onMounted(() => {
      if (!pannelsRef.value) return;
      const panels = pannelsRef.value.querySelectorAll('.about__panel');
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
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
          scrub: 0,
        });

        ScrollTrigger.create({
          trigger: panels[i],
          start: `top +=${window.innerHeight * 0.75}`,
          end: `top +=${window.innerHeight * 0.75}`,
          markers: true,
          toggleActions: 'play reverse play reverse',
          onEnter: async () => {
            if (i !== 0) {
              await shuffleString(paragraphRef.value, props.aboutPanels[i].text, true);
            }
          },
          onEnterBack: async () =>
            shuffleString(paragraphRef.value, props.aboutPanels[Math.max(0, i - 1)].text, true),
        });
      });

      gsap.from(paragraphRef.value, { duration: 1, delay: 1.8, opacity: 0 });

      ScrollTrigger.refresh(true);
    });

    return { paragraphRef, pannelsRef, getAsset };
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
.about__pannels-wrapper {
  .about__panel {
    position: relative;
    height: 100vh;
    img {
      position: absolute;
      top: 0;
      z-index: 0;
      filter: brightness(50%);
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
    .about__img-overlay {
      width: 100%;
      height: 100vh;
      background-color: black;
    }
  }
}
</style>
