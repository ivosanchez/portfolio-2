<template>
  <aside class="aside-left">
    <h1 ref="routeNameRef">{{ routeName }}</h1>
    <MenuIcon />
  </aside>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import gsap from 'gsap';
import { useRoute } from 'vue-router';
import MenuIcon from './Icons/Menu.vue';
import { DELAY_3_HALF } from '../constants/gsap';

export default defineComponent({
  name: 'AsideLeft',
  components: { MenuIcon },
  setup() {
    const route = useRoute();

    const routeNameRef = ref<HTMLHeadingElement | null>(null);

    onMounted(() => {
      if (!routeNameRef.value) return;
      gsap.from(routeNameRef.value, { duration: 2, delay: DELAY_3_HALF, width: 0 });
    });

    return { routeName: route.name ?? 'Works', routeNameRef };
  },
});
</script>

<style lang="scss" scoped>
.aside-left {
  @include aside;
  left: 0;
  padding-top: 2rem;
  padding-left: 1rem;
  font-family: 'Playfair Display', serif;
  h1 {
    @media screen and (min-width: 1000px) {
      display: block;
    }
    display: none;
    padding-bottom: 1rem;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    overflow: hidden;
  }
}
</style>
