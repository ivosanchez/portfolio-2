<template>
  <article :class="['stack__container', index % 2 !== 0 && 'right-column']">
    <h5>{{ desc.heading[language] }}</h5>
    <div></div>
    <p v-for="(paragraph, index) in desc.paragraphs" v-html="paragraph[language]" :key="index" />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAsset } from '../utils';

export default defineComponent({
  name: 'Stack',
  props: {
    desc: { required: true, type: Object },
    index: { required: true, type: Number },
    language: { required: true, type: String },
  },
  setup() {
    return { getAsset };
  },
});
</script>

<style lang="scss" scoped>
.stack__container {
  @media screen and (min-width: 1000px) {
    width: 50%;
    margin-bottom: 2rem;
  }
  width: 100%;
  display: grid;
  gap: 1rem;
  color: white;
  h5 {
    font-size: 2rem;
    font-weight: 600;
  }

  img {
    width: 90%;
    object-fit: center;
  }
  p {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.5rem;
    width: 90%;
  }
}

.right-column {
  @media screen and (min-width: 1000px) {
    margin-left: auto;
  }
}
</style>
