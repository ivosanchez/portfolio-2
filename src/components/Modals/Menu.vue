<template>
  <div class="menu__container">
    <div class="menu__bg" ref="bgContainerRef">
      <div class="menu__bg-column menu__bg-column-1"></div>
      <div class="menu__bg-column menu__bg-column-2"></div>
      <div class="menu__bg-column menu__bg-column-3"></div>
      <div class="menu__bg-column menu__bg-column-4"></div>
      <div class="menu__bg-column menu__bg-column-5"></div>
    </div>
    <div class="menu__contents">
      <nav>
        <ul class="menu__links" ref="linksContainerRef">
          <li>
            <router-link to="/" active-class="active">
              {{ language === 'ko' ? '작업들' : 'Works' }}
            </router-link>
          </li>
          <li>
            <router-link to="/about" active-class="active">
              {{ language === 'ko' ? '소개' : 'About' }}
            </router-link>
          </li>
          <li>
            <router-link to="/contact" active-class="active">
              {{ language === 'ko' ? '연락처' : 'Contact' }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="menu__misc" ref="langContainerRef">
        <div class="menu__github">
          <a :href="CONTACT.github" target="_blank">{{
            language === 'ko' ? '깃허브' : 'Github'
          }}</a>
        </div>
        <div class="menu__languages">
          <span class="menu__language" @click="toggleLanguage">{{
            language === 'ko' ? 'English' : '한국어'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GETTERS, useStore } from '@/store';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';
import { CONTACT } from '../../data';

export default defineComponent({
  name: 'MenuModal',
  setup() {
    const bgContainerRef = ref<HTMLDivElement | null>(null);
    const linksContainerRef = ref<HTMLUListElement | null>(null);
    const langContainerRef = ref<HTMLDivElement | null>(null);
    const { getters } = useStore();
    const { useKorean, useEnglish, toggleLanguage } = useLanguage();
    const language = computed(() => getters[GETTERS.GET_LANGUAGE]);

    onMounted(() => {
      const columns = bgContainerRef.value?.querySelectorAll('.menu__bg-column');
      const links = linksContainerRef.value?.querySelectorAll('a');
      if (!columns || !links || !langContainerRef.value) return;
      const open = gsap
        .timeline({ defaults: { duration: 0.3 } })
        .to(columns, {
          width: '100%',
          borderWidth: 1,
        })
        .to(
          links,
          {
            width: '100%',
          },
          '+=0.3'
        )
        .to(langContainerRef.value, { opacity: 1, pointerEvents: 'auto' }, '<')
        .pause();

      watch(
        () => getters[GETTERS.GET_IS_MENU_OPEN],
        () => {
          const isMenuOpen = getters[GETTERS.GET_IS_MENU_OPEN] as boolean;
          if (isMenuOpen) {
            open.restart();
            return;
          }
          open.reverse();
        }
      );
    });

    return {
      bgContainerRef,
      linksContainerRef,
      langContainerRef,
      useKorean,
      useEnglish,
      toggleLanguage,
      language,
      CONTACT,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu__container {
  @include menu-modal;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  .menu__bg {
    @media screen and (min-width: 1000px) {
      grid-template-columns: repeat(5, 1fr);
    }
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .menu__bg-column {
      width: 0%;
      border-left: solid lightgray;
      border-width: 0px;
      background-color: white;
    }
    .menu__bg-column-3,
    .menu__bg-column-4,
    .menu__bg-column-5 {
      @media screen and (min-width: 1000px) {
        display: block;
      }
      display: none;
    }
  }
  .menu__contents {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    nav {
      .menu__links {
        li {
          a {
            @media screen and (min-width: 400px) {
              font-size: 6rem;
            }
            @media screen and (min-width: 600px) {
              font-size: 10rem;
            }
            display: block;
            width: 0%;
            overflow: hidden;
            font-weight: 600;
            font-size: 4rem;
            font-family: 'Playfair Display', serif;
            color: black;
            pointer-events: auto;
            white-space: nowrap;
            transition: color 0.1s ease-in-out;
            &:hover {
              color: $primary;
            }
          }
          .active {
            color: $primary;
          }
        }
      }
    }
    .menu__misc {
      @media screen and (min-width: 600px) {
        font-size: 2rem;
      }
      @media screen and (min-width: 1000px) {
        width: $column-line-4-left;
      }
      width: calc((#{$mobile-column-line-3-left} - #{$mobile-column-line-1-left}) * 2);
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: flex-end;
      font-size: 1.2rem;
      font-family: 'Poppins', sans-serif;
      pointer-events: none;
      font-weight: 500;
      opacity: 0;
      .menu__languages {
        .menu__language {
          cursor: pointer;
          /* border-bottom: 2px solid black; */
          &:hover {
            /* border-bottom: 4px solid black; */
          }
        }
      }
      .menu__github {
        a {
          /* border-bottom: 2px solid black; */
          color: black;
        }
      }
    }
  }
}
</style>
