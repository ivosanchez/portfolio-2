<template>
  <a class="visit-btn__container" :href="href" target="_blank">
    <div class="visit-btn" role="button">
      <span>Visit {{ name }}</span>
    </div>
    <svg
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
          VISIT {{ name }}&nbsp;
        </textPath>
      </text>
    </svg>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VisitButton',
  props: {
    name: { required: true, type: String },
    href: { required: true, type: String },
  },
});
</script>

<style lang="scss" scoped>
.visit-btn__container {
  width: 100%;
  position: absolute;
  top: 70vh;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  .visit-btn {
    @include mobile-23-desktop-34__margins;
    pointer-events: auto;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    background-color: white;
    text-align: center;
    cursor: pointer;
    box-shadow: 1px 1px 10px 0px gray;
    transition: background-color 0.5s, color 0.5s;
    span {
      color: black;
      letter-spacing: 2px;
      font-size: 1.2rem;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
    }
    &:hover {
      span {
        color: $primary;
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
      text-transform: uppercase;
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
