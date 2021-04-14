<template>
  <div class="me__wrapper">
    <div class="me__container">
      <div class="me__circle" @click="copy">
        <span class="me__confirm-copy">{{ language === 'ko' ? '복사됨!' : 'Copied!' }}</span>
        <MailIcon />
      </div>
      <div class="me__circle">
        <a :href="CONTACT.github" target="_blank">
          <!-- <img src="@/assets/github.svg" /> -->
          <GithubIcon />
        </a>
      </div>
      <div class="me__circle">
        <a :href="CONTACT.instagram" target="_blank">
          <!-- <img src="@/assets/instagram.svg" /> -->
          <InstagramIcon />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CONTACT } from '@/data';
import gsap from 'gsap';
import useClipboard from '@/hooks/useClipboard';
import { GETTERS, useStore } from '@/store';
import MailIcon from './Icons/Mail.vue';
import GithubIcon from './Icons/Github.vue';
import InstagramIcon from './Icons/Instagram.vue';

export default defineComponent({
  name: 'Me',
  components: { MailIcon, GithubIcon, InstagramIcon },
  setup() {
    const { getters } = useStore();
    const { toClipboard } = useClipboard();
    const language = computed(() => getters[GETTERS.GET_LANGUAGE]);

    const confirmCopyAnim = () => {
      const element = document.querySelector('.me__confirm-copy');
      if (!element) return;
      gsap.fromTo(
        element,
        { opacity: 1, top: '-50%' },
        { duration: 1, delay: 1, opacity: 0, top: '-100%' }
      );
    };

    const copy = async () => {
      try {
        await toClipboard(CONTACT.email);
        confirmCopyAnim();
      } catch (err) {
        console.error(err);
      }
    };

    return { CONTACT, copy, language };
  },
});
</script>

<style lang="scss" scoped>
.me__wrapper {
  @include mobile-23-desktop-2345__margins;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .me__container {
    height: 40%;
    padding-bottom: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .me__circle {
      position: relative;
      width: 2.4rem;
      height: 2.4rem;
      background-color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: transparent;
        .mail-icon {
          stroke: white;
        }
        .github-icon,
        .instagram-icon {
          fill: white;
        }
      }
      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mail-icon,
      .github-icon,
      .instagram-icon {
        width: 1.2rem;
        transition: all 0.2s ease-in-out;
      }
      .me__confirm-copy {
        position: absolute;
        top: -50%;
        color: white;
        opacity: 0;
        white-space: nowrap;
      }
    }
  }
}
</style>
