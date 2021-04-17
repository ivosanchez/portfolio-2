<template>
  <section class="techs__wrapper" ref="sectionRef">
    <div class="techs__container" v-for="(techs, index) in techArrays" :key="index">
      <h5>{{ index === 0 ? 'Frontend' : 'Backend' }}</h5>
      <ul class="techs__ul" ref="ulRef">
        <li v-for="(tech, index) in techs" :key="index">{{ tech }}</li>
      </ul>
      <div class="arrow-btn__container">
        <ArrowButton text="Github" :href="index === 0 ? frontendGithubUrl : backendGithubUrl" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import ArrowButton from './ArrowButton.vue';

export default defineComponent({
  components: { ArrowButton },
  props: {
    techArrays: Array as PropType<string[][]>,
    frontendGithubUrl: String,
    backendGithubUrl: String,
  },
  setup() {
    const sectionRef = ref<HTMLDivElement | null>(null);
    const ulRef = ref<HTMLUListElement | null>(null);

    return { sectionRef, ulRef };
  },
});
</script>

<style lang="scss" scoped>
.techs__wrapper {
  @include mobile-23-desktop-2345__margins;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  margin-bottom: 12rem;
  display: grid;
  overflow: hidden;
  color: white;
  .techs__container {
    padding-top: 1rem;
    border-top: 1px solid white;
    h5 {
      @media screen and (min-width: 1024px) {
        font-size: 0.8rem;
      }
      margin-bottom: 2rem;
      font-size: 0.6rem;
    }
    .techs__ul {
      margin-bottom: 2.5rem;
      li {
        @media screen and (min-width: 1024px) {
          font-size: 3rem;
        }
        font-size: 1.8rem;
        font-weight: 600;
      }
    }
    .arrow-btn__container {
      width: 50%;
    }
  }
  .techs__container:last-child {
    @media screen and (min-width: 1024px) {
      margin-top: 9rem;
    }
    margin-top: 3rem;
  }
}
</style>
