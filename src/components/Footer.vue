<template>
  <footer class="footer" ref="footerRef">
    <div class="footer__row footer__row-vue">
      <a :href="THIS_SITE_GITHUB_URL" target="_blank">
        <span>Built with&nbsp;</span>
        <img src="@/assets/logo.png" />
      </a>
    </div>
    <div class="footer__row footer__row-copy">
      <span>&copy; {{ new Date().getFullYear() }} Jinseok Bang</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { DELAY_3_HALF } from '@/constants/gsap';
import { THIS_SITE_GITHUB_URL } from '../data';

export default defineComponent({
  name: 'Footer',
  setup() {
    const footerRef = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      const rows = footerRef.value?.querySelectorAll('.footer__row');
      if (!rows) return;
      gsap.from(rows, { duration: 0.5, delay: DELAY_3_HALF, opacity: 0 });
    });

    return { footerRef, THIS_SITE_GITHUB_URL };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  @include mobile-23-desktop-123456__paddings;
  @media screen and (min-width: 1024px) {
    padding: 0 1rem;
    grid-template-columns: 1fr 1fr;
  }
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $footer-height;
  display: grid;
  .footer__row {
    display: flex;
    align-items: center;
    a {
      display: flex;
      align-items: center;
      color: white;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .footer__row-copy {
    @media screen and (min-width: 1024px) {
      justify-content: flex-end;
    }
    justify-content: flex-start;
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
