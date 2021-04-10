<template>
  <aside class="aside-left" ref="asideRef">
    <h1>{{ routeName }}</h1>
    <MenuIcon />
  </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import MenuIcon from './Icons/Menu.vue';

export default defineComponent({
  name: 'AsideLeft',
  components: { MenuIcon },
  setup() {
    const route = useRoute();
    const routeName = route.name;

    return { routeName };
  },
});
</script>

<style lang="scss" scoped>
.aside-left {
  @include aside;
  left: 0;
  padding: 2rem 1rem;
  h1 {
    @media screen and (min-width: 1000px) {
      display: block;
    }
    display: none;
    color: white;
    font-size: 2rem;
    font-weight: 600;
  }
}
</style>
