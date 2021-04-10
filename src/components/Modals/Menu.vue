<template>
  <div class="menu__container">
    <div class="menu__bg" ref="bgContainerRef">
      <div class="menu__bg-column menu__bg-column-1"></div>
      <div class="menu__bg-column menu__bg-column-2"></div>
      <div class="menu__bg-column menu__bg-column-3"></div>
      <div class="menu__bg-column menu__bg-column-4"></div>
      <div class="menu__bg-column menu__bg-column-5"></div>
    </div>
    <nav>
      <ul class="menu__links" ref="linksContainer">
        <li>
          <router-link to="/" active-class="active">
            Works
          </router-link>
        </li>
        <li>
          <router-link to="/about" active-class="active">
            About
          </router-link>
        </li>
        <li>
          <router-link to="/contact" active-class="active">
            Contact
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { GETTERS, useStore } from '@/store';
import { defineComponent, onMounted, ref, watch } from 'vue';
import gsap from 'gsap';

export default defineComponent({
  name: 'MenuModal',
  setup() {
    const bgContainerRef = ref<HTMLDivElement | null>(null);
    const linksContainer = ref<HTMLUListElement | null>(null);
    const { getters } = useStore();

    onMounted(() => {
      const columns = bgContainerRef.value?.querySelectorAll('.menu__bg-column');
      const links = linksContainer.value?.querySelectorAll('a');
      if (!columns || !links) return;
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

    return { bgContainerRef, linksContainer };
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
    grid-template-columns: repeat(3, 1fr);
    .menu__bg-column {
      width: 0%;
      border-left: solid lightgray;
      border-width: 0px;
      background-color: white;
    }
    .menu__bg-column-4,
    .menu__bg-column-5 {
      @media screen and (min-width: 1000px) {
        display: block;
      }
      display: none;
    }
  }
  nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    ul {
      li {
        a {
          @media screen and (min-width: 1000px) {
            font-size: 10rem;
          }
          display: block;
          width: 0%;
          overflow: hidden;
          font-weight: 600;
          font-size: 4rem;
          color: black;
          pointer-events: auto;
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
}
</style>
