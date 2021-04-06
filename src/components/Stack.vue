<template>
  <article class="stack__container">
    <section>
      <img src="@/assets/polartypes/screenshot-3.png" />
    </section>
    <section>ss</section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Stack',
});
</script>

<style lang="scss" scoped>
.stack__container {
  @include mobile-23-desktop-2345__margins;
  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  display: grid;
  color: white;
  img {
    width: 100%;
    object-fit: center;
  }
}
</style>
