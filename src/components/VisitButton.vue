<template>
  <a
    class="visit-btn__container"
    ref="containerRef"
    href="https://polartypes.netlify.app/"
    target="_blank"
  >
    <div class="visit-btn" ref="btnRef" role="button">
      <span ref="spanRef">Visit {{ projectName }}</span>
    </div>
    <svg
      ref="svgRef"
      xmlns="http://www.w3.org/2000/svg"
      xml:lang="en"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 500 500"
    >
      <defs>
        <path
          id="textcircle"
          d="M250,400
                 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
          transform="rotate(12,250,250)"
        />
      </defs>
      <rect width="100%" height="100%" fill="none" />
      <text>
        <textPath xlink:href="#textcircle" aria-label="Visit this project" textLength="942">
          VISIT POLARTYPES&nbsp;
        </textPath>
      </text>
    </svg>
  </a>
</template>

<script lang="ts">
import gsap from 'gsap';
import { defineComponent, nextTick, ref, watch } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineComponent({
  name: 'VisitButton',
  props: {
    scrollRef: HTMLElement || null,
    projectName: String,
  },
  setup(props) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const btnRef = ref<HTMLDivElement | null>(null);
    const spanRef = ref<HTMLSpanElement | null>(null);
    const svgRef = ref<SVGElement | null>(null);
    watch(
      () => props.scrollRef,
      () => {
        nextTick(() => {
          if (containerRef.value && btnRef.value && svgRef.value) {
            const tl = gsap.timeline({ defaults: { duration: 0.6 } });
            tl.to(spanRef.value, { opacity: 0 });
            tl.to(
              containerRef.value,
              {
                top: '85vh',
                right: '2rem',
                paddingRight: 0,
                paddingLeft: 0,
                width: 100,
                height: 100,
              },
              '-=0.4'
            );
            tl.to(
              btnRef.value,
              {
                width: 0,
                height: 0,
                borderRadius: '50%',
              },
              '<'
            );
            tl.to(
              svgRef.value,
              {
                opacity: 1,
                pointerEvents: 'auto',
              },
              '-=0.3'
            );
            ScrollTrigger.create({
              trigger: containerRef.value,
              scroller: props.scrollRef,
              start: 'center center',
              toggleActions: 'play none none reverse',
              animation: tl,
              markers: true,
            });
          }
        });
      }
    );

    return { containerRef, btnRef, spanRef, svgRef };
  },
});
</script>

<style lang="scss" scoped>
.visit-btn__container {
  @include mobile-23-desktop-45__paddings;
  display: block;
  position: absolute;
  top: 70vh;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  .visit-btn {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0;
    background-color: white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.5s, color 0.5s;
    span {
      color: black;
    }
    &:hover {
      background-color: $primary;
      span {
        color: white;
      }
    }
  }
  svg {
    pointer-events: none;
    animation: rotation 8s infinite linear;
    position: absolute;
    width: 100px;
    opacity: 0;
    text {
      fill: white;
      font-size: 4rem;
    }
    &:hover {
      text {
        fill: $primary;
      }
    }
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
