<template>
  <teleport to="head">
    <title>{{ title }} | Jinseok Bang</title>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Title',
  props: { projectName: String },
  setup(props) {
    const { name } = useRoute();

    return { title: props.projectName ?? name };
  },
});
</script>
