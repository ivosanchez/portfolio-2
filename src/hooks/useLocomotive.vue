<script lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { GETTERS, useStore } from '@/store';

gsap.registerPlugin(ScrollTrigger);

const useLocomitive = () => {
  const scrollRef = ref<HTMLDivElement | null>(null);
  const locoScroll = ref();

  const { getters } = useStore();

  const onRefresh = () => {
    if (!locoScroll.value) return;
    locoScroll.value.update();
    locoScroll.value.start();
  };

  watch(
    () => getters[GETTERS.GET_LANGUAGE],
    () => {
      setTimeout(() => locoScroll.value.update(), 100);
    }
  );

  onMounted(() => {
    if (scrollRef.value) {
      locoScroll.value = new LocomotiveScroll({
        el: scrollRef.value,
        smooth: true,
      });
      locoScroll.value.stop();
      locoScroll.value.on('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(scrollRef.value, {
        scrollTop(value) {
          if (arguments.length) {
            return locoScroll.value.scrollTo(value, 0, 0);
          }
          return locoScroll.value.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollRef.value.style.transform ? 'transform' : 'fixed',
      });
      ScrollTrigger.addEventListener('refresh', onRefresh);
      // ScrollTrigger.refresh(true);
    }
  });

  onBeforeUnmount(() => {
    ScrollTrigger.removeEventListener('refresh', onRefresh);
    if (!locoScroll.value) return;
    locoScroll.value.destroy();
  });

  return { scrollRef, locoScroll, ScrollTrigger };
};

export default useLocomitive;
</script>
