<template>
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <ColumnLines />
    <component :is="Component" />
    <AsideLeft />
    <AsideRight />
    <MenuModal />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AsideLeft from './components/AsideLeft.vue';
import AsideRight from './components/AsideRight.vue';
import ColumnLines from './components/ColumnLines.vue';
import MenuModal from './components/Modals/Menu.vue';

export default defineComponent({
  name: 'App',
  components: { ColumnLines, AsideLeft, AsideRight, MenuModal },
});
</script>
