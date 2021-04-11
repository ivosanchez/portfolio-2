<template>
  <LeaveAnimation />
  <Title />
  <main class="contact__wrapper" ref="mainRef">
    <div class="contact__email-container">
      <span class="contact__br" />
      <h3>{{ language === 'ko' ? '이메일' : 'Email' }}</h3>
      <div class="contact__copy-container" @click="copy">
        <span class="contact__content">{{ CONTACT.email }}</span>
        <span class="contact__copy">{{ language === 'ko' ? '복사하기' : 'Copy' }}</span>
      </div>
    </div>
    <div class="contact__mobile-container">
      <span class="contact__br" />
      <h3>{{ language === 'ko' ? '전화번호' : 'Mobile' }}</h3>
      <div class="contact__copy-container" @click="copy">
        <span class="contact__content">{{ CONTACT.phone }}</span>
        <span class="contact__copy">{{ language === 'ko' ? '복사하기' : 'Copy' }}</span>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script lang="ts">
import { GETTERS, TLanguage, useStore } from '@/store';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '../components/Footer.vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Title from '../components/Title.vue';
import useClipboard from '../hooks/useClipboard';
import useShuffleString from '../hooks/useShuffleString.vue';

export default defineComponent({
  name: 'Contact',
  components: { LeaveAnimation, Title, Footer },
  props: { CONTACT: { required: true, type: Object } },
  setup() {
    const { getters } = useStore();
    const routeName = useRoute().name;
    const mainRef = ref<HTMLDivElement | null>(null);
    const language = computed<TLanguage>(() => getters[GETTERS.GET_LANGUAGE]);
    const { toClipboard } = useClipboard();
    const { shuffleString } = useShuffleString();

    const copy = async (e: Event) => {
      const el = e.currentTarget as HTMLDivElement;
      const span = el.querySelector<HTMLSpanElement>('.contact__content');
      const copy = el.querySelector<HTMLSpanElement>('.contact__copy');
      const text = span?.innerText;
      if (!text) return;
      try {
        const cleaned = text.replaceAll('-', '');
        await toClipboard(cleaned);
        const shuffleTo = language.value === 'ko' ? '복사완료!' : 'Copied!';
        await shuffleString(copy, shuffleTo, true);
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      if (!mainRef.value) return;
      const brs = mainRef.value.querySelectorAll('.contact__br');
      const headings = mainRef.value.querySelectorAll('h3');
      const copyContainers = mainRef.value.querySelectorAll('.contact__copy-container');
      const tl = gsap.timeline({ defaults: { duration: 0.5 } });
      tl.from(brs, { width: 0, delay: 1.5 });
      tl.from(headings, { width: 0, overflow: 'hidden' });
      tl.from(copyContainers, { opacity: 0 }, '+=0.2');
    });

    return { mainRef, copy, routeName, language };
  },
});
</script>

<style lang="scss" scoped>
.contact__wrapper {
  position: relative;
  height: 100vh;
  align-items: center;
  display: grid;
  padding-bottom: 10vh;
  .contact__email-container {
    @include mobile-23-desktop-23__margins;
  }
  .contact__mobile-container {
    @include mobile-23-desktop-45__margins;
  }
  .contact__br {
    @media screen and (min-width: 1000px) {
      width: $column-line-width;
    }
    display: inline-block;
    width: 42vw;
    height: 2px;
    background-color: white;
  }
  h3 {
    @media screen and (min-width: 1000px) {
      width: $column-line-width;
    }
    @media screen and (min-width: 600px) {
      font-size: 4rem;
    }
    width: 42vw;
    padding: 1rem 0;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: white;
    white-space: nowrap;
  }
  .contact__copy-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    span {
      @media screen and (min-width: 600px) {
        font-size: 2rem;
      }
      font-size: 1rem;
    }
    .contact__copy {
      opacity: 0.6;
      font-size: 1rem;
      margin-left: 2rem;
      white-space: nowrap;
    }
    &:hover {
      color: $primary;
    }
  }
}
</style>
