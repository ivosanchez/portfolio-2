<template>
  <div class="project">
    <div :class="['project__header', index % 2 === 0 ? 'align-left' : 'align-right']">
      <span ref="numberRef">0{{ index + 1 }}.</span>
      <router-link :to="project.link">
        <h3 ref="nameRef">
          {{ project.name }}
        </h3>
      </router-link>
    </div>
    <ul :class="['techs', index % 2 === 0 ? 'align-left' : 'align-right']" ref="techsRef">
      <li v-for="tech in project.techs" v-bind:key="tech.name">{{ tech }}</li>
    </ul>
    <img :src="getAsset(project.imgUrl)" />
    <p class="desc">This is a description of the project.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: 'Project',
  props: { project: Object, index: Number },
  setup(props) {
    const getAsset = (url: string) => require(`@/assets/${url}`);
    const numberRef = ref<HTMLSpanElement | null>(null);
    const nameRef = ref<HTMLHeadingElement | null>(null);
    const techsRef = ref<HTMLUListElement | null>(null);

    onMounted(() => {
      if (numberRef.value && nameRef.value && techsRef.value && props.index !== undefined) {
        gsap.from(numberRef.value, {
          scrollTrigger: { trigger: nameRef.value },
          duration: 0.5,
          x:
            props.index % 2 === 0
              ? -numberRef.value.clientWidth * 2
              : numberRef.value.clientWidth * 2,
        });
        gsap.from(nameRef.value, {
          scrollTrigger: { trigger: nameRef.value },
          duration: 1,
          x: props.index % 2 === 0 ? -nameRef.value.clientWidth * 2 : nameRef.value.clientWidth * 2,
        });
        techsRef.value.querySelectorAll('li').forEach((li) => {
          if (!nameRef.value) return;
          gsap.from(li, {
            scrollTrigger: { trigger: nameRef.value, scrub: 1, end: 'top center' },
            duration: 0.4,
            opacity: 0,
            y: 20,
          });
        });
      }
    });

    return { getAsset, techsRef, numberRef, nameRef };
  },
});
</script>

<style lang="scss" scoped>
.align-left {
  align-items: flex-start;
  h3,
  li {
    text-align: left;
  }
}
.align-right {
  align-items: flex-end;
  h3,
  li {
    text-align: right;
  }
}

.project {
  width: 100%;
  margin-bottom: 50vh;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  .project__header {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    span {
      color: $primary;
      font-size: 1.5rem;
    }
    h3 {
      margin-top: 1rem;
      margin-bottom: 1rem;
      color: white;
      font-size: 2.5rem;
    }
  }
  img {
    margin-bottom: 1rem;
    width: 100%;
  }
  ul {
    margin-bottom: 1rem;
    li {
      display: block;
      color: white;
      font-size: 1rem;
    }
  }
  .desc {
    color: white;
    font-weight: 300;
  }
}
</style>
