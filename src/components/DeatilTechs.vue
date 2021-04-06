<template>
  <section
    :class="['techs__container', isFront ? 'techs frontend__container' : 'backend__container']"
    ref="sectionRef"
  >
    <div class="break" />
    <h5>{{ isFront ? 'Frontend' : 'Backend' }}</h5>
    <ul class="techs__ul" ref="ulRef">
      <li v-for="(tech, index) in techs" :key="index">{{ tech }}</li>
    </ul>
    <div class="arrow-btn__container">
      <ArrowButton />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import ArrowButton from './ArrowButton.vue';

export default defineComponent({
  components: { ArrowButton },
  props: {
    isFront: Boolean,
    techs: Array as PropType<string[]>,
  },
  setup() {
    const sectionRef = ref<HTMLDivElement | null>(null);
    const ulRef = ref<HTMLUListElement | null>(null);

    return { sectionRef, ulRef };
  },
});
</script>

<style lang="scss" scoped>
.techs__container {
  margin: 15vh 0;
  overflow: hidden;
  color: white;
  .break {
    width: 100%;
    height: 1px;
    background-color: white;
    margin: 2rem 0;
  }
  h5 {
    @media screen and (min-width: 1000px) {
      font-size: 0.8rem;
    }
    margin-bottom: 2rem;
    font-size: 0.6rem;
  }
  .techs__ul {
    margin-bottom: 2.5rem;
    li {
      @media screen and (min-width: 1000px) {
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

.frontend__container {
  @include mobile-23-desktop-34__margins;
}

.backend__container {
  @include mobile-23-desktop-45__paddings;
}
</style>
