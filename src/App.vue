<template>
  <!-- <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  /> -->
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <ColumnLines />
    <component :is="Component" />
    <AsideLeft />
    <AsideRight />
  </router-view>
  <CustomCursor />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColumnLines from './components/ColumnLines.vue';
import CustomCursor from './components/CustomCursor.vue';
import AsideLeft from './components/AsideLeft.vue';
import AsideRight from './components/AsideRight.vue';

export default defineComponent({
  name: 'App',
  components: { ColumnLines, CustomCursor, AsideLeft, AsideRight },
});
</script>
