<template>
  <section
    :class="['techs', isFront ? 'techs frontend__container' : 'backend__container']"
    ref="sectionRef"
  >
    <div class="break" />
    <h5>{{ isFront ? 'Frontend' : 'Backend' }}</h5>
    <ul ref="ulRef">
      <li v-for="(tech, index) in techs" :key="index">{{ tech }}</li>
    </ul>
    <ArrowButton />
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrowButton from './ArrowButton.vue';

export default defineComponent({
  components: { ArrowButton },
  props: {
    scrollRef: HTMLElement || null,
    isFront: Boolean,
    techs: Array as PropType<string[]>,
  },
  setup(props) {
    const sectionRef = ref<HTMLDivElement | null>(null);
    const ulRef = ref<HTMLUListElement | null>(null);

    watch(
      () => props.scrollRef,
      () => {
        nextTick(() => {
          if (!ulRef.value || !sectionRef.value) return;
          const arrowBtn = sectionRef.value.querySelector('.arrow-btn');
          const lists = ulRef.value.querySelectorAll('li');
          lists.forEach((li) => {
            if (!ulRef.value || !li) return;
            const animation = gsap.from(li, {
              opacity: 0,
              x: 100,
            });
            ScrollTrigger.create({
              trigger: li,
              scroller: props.scrollRef,
              animation,
            });
          });
          if (!arrowBtn) return;
          const animation = gsap.from(arrowBtn, {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
          });
          ScrollTrigger.create({
            trigger: arrowBtn,
            scroller: props.scrollRef,
            animation,
          });
        });
      }
    );

    return { sectionRef, ulRef };
  },
});
</script>

<style lang="scss" scoped>
.techs {
  margin: 15vh 0;
  overflow: hidden;
  color: white;
  .break {
    width: 100%;
    height: 1px;
    background-color: white;
    margin: 1rem 0;
  }
  h5 {
    @media screen and (min-width: 1000px) {
      font-size: 0.8rem;
    }
    margin-bottom: 1rem;
    font-size: 0.6rem;
  }
  ul {
    margin-bottom: 2.5rem;
    li {
      @media screen and (min-width: 1000px) {
        font-size: 3rem;
      }
      font-size: 1.8rem;
      font-weight: 600;
    }
  }
}

.frontend__container {
  @include mobile-23-desktop-34__margins;
}

.backend__container {
  @include mobile-23-desktop-45__paddings;
}
</style>
