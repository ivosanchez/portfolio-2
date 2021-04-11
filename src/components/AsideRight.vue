<template>
  <aside class="aside-right">
    <div class="aside-right__languages-container">
      <span class="aside-right__lan" @click="useKorean">ko</span>
      <span> / </span>
      <span class="aside-right__lan" @click="useEnglish">en</span>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLanguage } from '../hooks/useLanguage';

export default defineComponent({
  name: 'AsideRight',
  setup() {
    const fns = useLanguage();

    return { ...fns };
  },
});
</script>

<style lang="scss" scoped>
.aside-right {
  @include aside;
  right: 0;
  padding-top: 2rem;
  padding-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  .aside-right__languages-container {
    @media screen and (min-width: 1000px) {
      display: block;
    }
    display: none;
    color: white;
    font-size: 0.9rem;
    .aside-right__lan {
      pointer-events: auto;
      cursor: pointer;
      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
