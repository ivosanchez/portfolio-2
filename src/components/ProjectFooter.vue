<template>
  <footer class="next-project__container">
    <router-link :to="to">
      <span class="next-project" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"
        >Next Project</span
      >
      <div class="next-project__name">
        <span>{{ nextName }}</span>
      </div>
    </router-link>
    <span class="test" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">Next Project</span>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: { nextName: String, to: String },
  setup() {
    const isBusy = ref(false);

    const onMouseEnter = async (e: MouseEvent) => {
      if (isBusy.value) return;
      isBusy.value = true;
      const el = e.currentTarget as HTMLSpanElement;
      const text = 'DjangoEats';
      const sleep = () => new Promise<void>((resolve) => setTimeout(resolve, 40));
      for (let i = 0; i < 10; i += 1) {
        const r = Math.random()
          .toString(36)
          .substring(2, 12);
        el.innerText = r;
        /* eslint-disable-next-line */
        await sleep();
      }
      el.innerText = text;
      isBusy.value = false;
    };

    const onMouseLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLSpanElement;
      el.innerText = 'Next Project';
    };

    return { onMouseEnter, onMouseLeave };
  },
});
</script>

<style lang="scss" scoped>
.test {
  color: white;
}
.next-project__container {
  @include mobile-23-desktop-234__paddings;
  padding-top: 2rem;
  padding-bottom: 20vh;
  a {
    display: block;
    .next-project {
      display: inline-block;
      margin-bottom: 1rem;
      color: black;
      text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
      font-size: 3rem; // For browsers not supporting font-size based on vw
      font-size: calc(3rem + 4vw);
      transition: color 0.2s;
    }
    .next-project__name {
      text-align: end;
      margin-top: 0.4rem;
      color: white;
      font-size: 1.5rem;
      transition: color 0.2s;
    }
    &:hover {
      .next-project {
        color: white;
      }
      .next-project__name {
        color: $primary;
      }
    }
  }
}
</style>
