<template>
  <LeaveAnimation />
  <Title />
  <main ref="scrollRef">
    <h1>{{ language === 'ko' ? '연락처' : 'Contact' }}</h1>
    <ul>
      <li @click="copyEmail">
        <div></div>
        <span>{{ language === 'ko' ? '이메일' : 'Email' }}</span>
        <span class="contact__copy">{{ language === 'ko' ? '복사' : 'Copy' }}</span>
      </li>
      <li>
        <div></div>
        <a :href="CONTACT.github" target="_blank">
          <span>{{ language === 'ko' ? '깃허브' : 'Github' }}</span>
          <span class="contact__link">{{ language === 'ko' ? '열기' : 'Link' }}</span>
        </a>
      </li>
      <li>
        <div></div>
        <a :href="CONTACT.instagram" target="_blank">
          <span>{{ language === 'ko' ? '인스타그램' : 'Instagram' }}</span>
          <span class="contact__link">{{ language === 'ko' ? '열기' : 'Link' }}</span>
        </a>
      </li>
    </ul>
    <Footer />
  </main>
</template>

<script lang="ts">
import { DELAY_1 } from '@/constants/gsap';
import { IContact } from '@/data';
import useLocomitive from '@/hooks/useLocomotive.vue';
import { GETTERS, TLanguage, useStore } from '@/store';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, PropType } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '../components/Footer.vue';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Title from '../components/Title.vue';
import useClipboard from '../hooks/useClipboard';
import useShuffleString from '../hooks/useShuffleString.vue';

export default defineComponent({
  name: 'Contact',
  components: { LeaveAnimation, Title, Footer },
  props: { CONTACT: { required: true, type: Object as PropType<IContact> } },
  setup(props) {
    const { getters } = useStore();
    const routeName = useRoute().name;
    const language = computed<TLanguage>(() => getters[GETTERS.GET_LANGUAGE]);
    const { toClipboard } = useClipboard();
    const { shuffleString } = useShuffleString();
    const { scrollRef, ScrollTrigger } = useLocomitive();

    const copyEmail = async (e: Event) => {
      const el = e.currentTarget as HTMLDivElement;
      const copy = el.querySelector<HTMLSpanElement>('.contact__copy');
      try {
        await toClipboard(props.CONTACT.email);
        const shuffleTo = language.value === 'ko' ? '복사완료!' : 'Copied!';
        await shuffleString(copy, shuffleTo, true);
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      if (!scrollRef.value) return;
      const heading = scrollRef.value.querySelector('h1');
      const lists = scrollRef.value.querySelectorAll('li');
      const tl = gsap.timeline({ defaults: { duration: 0.6 } });
      tl.from(heading, { delay: DELAY_1, clipPath: 'inset(0% 100% 0% 0%)' });
      tl.from(lists, { opacity: 0, stagger: 0.4 }, '+=0.4');

      setTimeout(() => ScrollTrigger.refresh(true), 1000);
    });

    return { scrollRef, copyEmail, routeName, language };
  },
});
</script>

<style lang="scss" scoped>
main {
  position: relative;
  height: calc(100vh + #{$footer-height});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 1em;
    font-size: $font-size-l;
    color: white;
    letter-spacing: 5px;
  }
  ul {
    @include mobile-23-desktop-34__paddings;
    display: grid;
    align-content: center;
    width: 100%;
    li {
      position: relative;
      padding: 0.5em 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid white;
      cursor: pointer;
      font-size: $font-size-s;
      transition: padding 0.3s;
      a {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      span {
        color: white;
        font-weight: 600;
      }
      div {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 0%;
        background-color: white;
        transition: height 0.3s;
      }
      .contact__copy,
      .contact__link {
        opacity: 0.6;
        font-weight: 300;
      }
      &:hover {
        padding: 0.5em;
        span {
          color: black;
        }
        div {
          height: 100%;
        }
      }
    }
  }
}
</style>
