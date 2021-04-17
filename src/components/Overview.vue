<template>
  <article class="overview__container">
    <section class="overview__left-column">
      <span>Created by</span>
      <span>Jinseok Bang</span>
    </section>
    <section class="overview__right-column">
      <span>Overview</span>
      <div class="overview" v-for="(overview, index) in overviews" :key="index">
        <h5>{{ overview.heading[language] }}</h5>
        <p
          v-for="(paragraph, index) in overview.paragraphs"
          v-html="paragraph[language]"
          :key="index"
        />
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Overview',
  props: { overviews: { required: true, type: Array }, language: { required: true, type: String } },
});
</script>

<style lang="scss" scoped>
.overview__container {
  @include mobile-23-desktop-2345__margins;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  margin-bottom: 6rem;
  display: grid;
  color: white;
  .overview__left-column,
  .overview__right-column {
    padding: 1rem 0;
  }
  .overview__left-column {
    span {
      display: block;
      margin-bottom: 0.2rem;
      font-size: 0.8rem;
    }
  }
  .overview__right-column {
    border-top: 1px solid white;
    overflow: hidden;
    span {
      font-size: 0.8rem;
    }
    .overview {
      padding: 1rem 0;
      h5 {
        margin: 1rem 0 1.5rem 0;
        font-size: 2rem;
        font-weight: 600;
      }
      p {
        font-size: 0.9rem;
        font-weight: 300;
        line-height: 1.5rem;
        white-space: pre-line;
      }
    }
  }
}
</style>
