<template>
  <LeaveAnimation />
  <main>
    <h1>Page</h1>
    <h1>Not</h1>
    <h1>Found</h1>
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import gsap from 'gsap';
import LeaveAnimation from '../components/LeaveAnimation.vue';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'NotFound404',
  components: { LeaveAnimation, Footer },
  setup() {
    onMounted(() => {
      const headings = document.querySelectorAll('h1');
      gsap.from(headings, { duration: 1, delay: 1.5, xPercent: -100, stagger: 0.3 });
    });
  },
});
</script>

<style lang="scss" scoped>
main {
  @include mobile-23-desktop-2345__margins;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  h1 {
    @media screen and (min-width: 1000px) {
      font-size: 10rem;
    }
    width: 100%;
    font-size: 6rem;
    color: white;
  }
}
</style>
