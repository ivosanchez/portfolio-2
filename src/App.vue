<template>
  <!-- <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  /> -->
  <router-view v-slot="{ Component }">
    <ColumnLines />
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColumnLines from './components/ColumnLines.vue';

export default defineComponent({
  name: 'App',
  components: { ColumnLines },
});
</script>
