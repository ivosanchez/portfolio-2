<template>
  <aside class="aside-right">
    <div class="aside-right__langs-container" ref="langsContainerRef">
      <span
        :class="[language === 'ko' ? 'aside-right__lang--active' : 'aside-right__lang']"
        @click="useKorean"
        >ko</span
      >
      <span class="aside-right__lang-divider">/</span>
      <span
        :class="[language === 'en' ? 'aside-right__lang--active' : 'aside-right__lang']"
        @click="useEnglish"
        >en</span
      >
    </div>
  </aside>
</template>

<script lang="ts">
import { DELAY_3_HALF } from '@/constants/gsap';
import { GETTERS, useStore } from '@/store';
import gsap from 'gsap';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useLanguage } from '../hooks/useLanguage';

export default defineComponent({
  name: 'AsideRight',
  setup() {
    const { getters } = useStore();
    const language = computed(() => getters[GETTERS.GET_LANGUAGE]);
    const langsContainerRef = ref<HTMLDivElement | null>(null);
    const fns = useLanguage();

    onMounted(() => {
      if (!langsContainerRef.value) return;
      gsap.from(langsContainerRef.value, {
        duration: 1,
        delay: DELAY_3_HALF,
        x: langsContainerRef.value.clientWidth,
      });
    });

    return { ...fns, langsContainerRef, language };
  },
});
</script>

<style lang="scss" scoped>
.aside-right {
  @include aside;
  right: 0;
  padding-top: 2rem;
  padding-right: 1.5rem;
  .aside-right__langs-container {
    @media screen and (min-width: 1000px) {
      display: flex;
      justify-content: flex-end;
    }
    display: none;
    color: white;
    font-size: 0.9rem;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
    .aside-right__lang {
      pointer-events: auto;
      cursor: pointer;
      &:hover {
        color: $primary;
      }
    }
    .aside-right__lang--active {
      color: $primary;
    }
    .aside-right__lang-divider {
      margin: 0 5px;
    }
  }
}
</style>
