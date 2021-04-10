<template>
  <div class="next-project__container">
    <router-link :to="to">
      <span class="next-project" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"
        >Next Project</span
      >
    </router-link>
  </div>
</template>

<script lang="ts">
import useShuffleString from '@/hooks/useShuffleString.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NextProject',
  props: { nextName: { required: true, type: String }, to: { required: true, type: String } },
  setup(props) {
    const { onMouseEnter, onMouseLeave } = useShuffleString({
      initial: 'Next Project',
      output: props.nextName,
    });

    return { onMouseEnter, onMouseLeave };
  },
});
</script>

<style lang="scss" scoped>
.next-project__container {
  /* @include mobile-23-desktop-345__paddings; */
  display: flex;
  justify-content: center;
  padding: 25vh 0;
  a {
    display: block;
    .next-project {
      display: inline-block;
      margin-bottom: 1rem;
      color: black;
      text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
      font-size: 3rem; // For browsers not supporting font-size based on vw
      font-size: calc(3rem + 4vw);
    }
  }
}
</style>
