<template>
  <aside class="aside-right">
    <div>
      <span @click="useKorean">ko</span>
      <span> / </span>
      <span @click="useEnglish">en</span>
    </div>
  </aside>
</template>

<script lang="ts">
import { MUTAIONS, useStore } from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AsideRight',
  setup() {
    const { commit } = useStore();

    const useKorean = () => {
      commit(MUTAIONS.TOGGLE_LANGUAGE, 'ko');
    };

    const useEnglish = () => {
      console.log('to english');
      commit(MUTAIONS.TOGGLE_LANGUAGE, 'en');
    };

    return { useKorean, useEnglish };
  },
});
</script>

<style lang="scss" scoped>
.aside-right {
  @include aside;
  right: 0;
  padding-top: 2rem;
  div {
    color: white;
    font-size: 0.9rem;
    pointer-events: auto;
  }
}
</style>
