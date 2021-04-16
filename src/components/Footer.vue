<template>
  <footer class="footer" ref="footerRef">
    <div class="footer__row">
      <span>Built with&nbsp;</span>
      <img src="@/assets/logo.png" />
    </div>
    <div class="footer__row">
      <span>Copyright &copy; Jinseok Bang</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { DELAY_3_HALF } from '@/constants/gsap';

export default defineComponent({
  name: 'Footer',
  setup() {
    const footerRef = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      const rows = footerRef.value?.querySelectorAll('.footer__row');
      if (!rows) return;
      gsap.from(rows, { duration: 0.5, delay: DELAY_3_HALF, width: 0, overflow: 'hidden' });
    });

    return { footerRef };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  @include mobile-23-desktop-34__paddings;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $footer-height;
  display: grid;
  .footer__row {
    width: 50%;
    display: flex;
    align-items: center;
  }
  span {
    white-space: nowrap;
    font-size: 0.8rem;
    color: white;
    letter-spacing: 1px;
  }
  img {
    width: 1rem;
  }
}
</style>
