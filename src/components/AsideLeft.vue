<template>
  <aside class="aside-left" ref="asideRef">
    <div />
    <router-link to="/">
      <span>Home</span>
    </router-link>
    <router-link to="/about">
      <span>About</span>
    </router-link>
    <div class="aside-left__bottom-row">
      <ContactDrawer />
      <div class="aside-left__icon-container">
        <MailIcon />
      </div>
    </div>
  </aside>
</template>
<script lang="ts">
import gsap from 'gsap';
import { defineComponent, onMounted, ref } from 'vue';
import ContactDrawer from './ContactDrawer.vue';
import MailIcon from './Icons/Mail.vue';

export default defineComponent({
  name: 'AsideLeft',
  components: { ContactDrawer, MailIcon },
  setup() {
    const asideRef = ref<HTMLDivElement | null>(null);

    const runAnim = () => {
      if (asideRef.value) {
        const spans = asideRef.value.querySelectorAll('span');
        gsap.from(spans, { duration: 0.5, delay: 2.5, height: 0 });
      }
    };

    onMounted(() => {
      runAnim();
    });

    return { asideRef };
  },
});
</script>

<style lang="scss" scoped>
.aside-left {
  @include aside;
  left: 0;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  a {
    width: 50%;
    padding-left: 1.4rem;
    pointer-events: auto;
    color: white;
    span {
      writing-mode: vertical-rl;
      text-orientation: upright;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      font-size: 0.7rem;
      display: block;
      overflow: hidden;
    }
    &:hover {
      color: $primary;
    }
  }
  .aside-left__bottom-row {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    .aside-left__icon-container {
      position: relative;
      z-index: 10;
      width: 50%;
      cursor: pointer;
      pointer-events: auto;
      padding-left: 1rem;
      svg {
        fill: red;
        width: 1.5rem;
      }
      &:hover {
        svg {
          fill: $primary;
        }
      }
    }
  }
}
</style>
