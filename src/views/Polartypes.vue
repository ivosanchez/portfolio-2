<template>
  <!-- <ColumnLines /> -->
  <LeaveAnimation />
  <main ref="scrollRef">
    <div class="hero-img-container">
      <img src="@/assets/polartypes/screenshot.png" />
    </div>
    <div class="heading">
      <h1>Polartypes</h1>
      <VisitButton />
    </div>
    <section class="desc__container">
      <div class="break" />
      <h3>Polartypes and Polarsteps</h3>
      <p>
        Polarsteps는 전세계의 여행자들과 모험가들을 위한 소셜 네트워크 서비스를 제공하고 있어요.
        자바스크립트를 처음 배울 때부터 꼭 클론코딩을 해보고자 마음 먹었던 곳이에요. 그래서 저에겐
        다른 프로젝트들보다도 더 의미가 깊어요.
      </p>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Frontend</h3>
      <p>
        React를 사용해서
      </p>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Backend</h3>
      <p>
        단순히 눈에 보이는 것만 클론코딩 한 것이 아니에요. Nestjs와 GraphQL을 사용해서 Account,
        Trip, Step 그리고 Comment까지 CRUD를 구축했어요.
      </p>
    </section>
    <section class="desc__container">
      <div class="break" />
      <h3>Typescript</h3>
      <p>
        프론트와 백엔드 모두에 typescript를 사용했어요.
      </p>
    </section>
    <section class="frontend__container">
      <div class="break" />
      <h5>Frontend</h5>
      <ul>
        <li>React</li>
        <li>Apollo</li>
        <li>Moment</li>
        <li>Mapbox</li>
        <li>TailwindCSS</li>
      </ul>
    </section>
    <section class="backend__container">
      <div class="break" />
      <h5>Backend</h5>
      <ul>
        <li>NestJS</li>
        <li>GraphQL</li>
        <li>TypeORM</li>
        <li>PostgreSQL</li>
        <li>Jest</li>
      </ul>
    </section>
    <section class="next-project__container">
      <span class="next-project">Next Project</span>
      <div class="next-project__name">
        <span>DjangoEats</span>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import LocomotiveScroll from 'locomotive-scroll';
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue';
import VisitButton from '../components/VisitButton.vue';

export default defineComponent({
  name: 'Polartypes',
  components: { VisitButton, LeaveAnimation },
  setup() {
    const scrollRef = ref<HTMLDivElement | null>(null);
    const locoScroll = ref();

    setTimeout(() => locoScroll.value.update(), 500);

    onMounted(() => {
      if (!scrollRef.value) return;
      locoScroll.value = new LocomotiveScroll({
        el: scrollRef.value,
        smooth: true,
      });
    });

    onUnmounted(() => {
      if (!locoScroll.value) return;
      locoScroll.value.destroy();
    });

    return { scrollRef };
  },
});
</script>

<style lang="scss" scoped>
.hero-img-container {
  padding-top: 25vh;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  margin-bottom: 2.5rem;
  img {
    width: 100%;
    object-fit: cover;
  }
}
.heading {
  position: relative;
  height: 6rem;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  margin-bottom: 4rem;
  h1 {
    color: white;
    font-size: 2.5rem;
  }
}

.desc__container {
  margin: 15vh 0;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  color: white;
  .break {
    width: 100%;
    height: 1px;
    background-color: white;
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  p {
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1.2rem;
  }
}

.frontend__container {
  margin: 15vh 0;
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-3-left;
  color: white;
  .break {
    width: 100%;
    height: 1px;
    background-color: white;
    margin-bottom: 1rem;
  }
  h5 {
    margin-bottom: 1rem;
    font-size: 0.6rem;
  }
  ul {
    li {
      font-size: 1.1rem;
    }
  }
}

.backend__container {
  margin: 15vh 0;
  padding-left: $mobile-column-line-3-left;
  padding-right: $mobile-column-line-5-right;
  color: white;
  .break {
    width: 100%;
    height: 1px;
    background-color: white;
    margin: 1rem 0;
  }
  h5 {
    margin-bottom: 1rem;
    font-size: 0.6rem;
  }
  ul {
    li {
      font-size: 1.1rem;
    }
  }
}

.next-project__container {
  padding-left: $mobile-column-line-1-left;
  padding-right: $mobile-column-line-5-right;
  margin: 2rem 0 4rem 0;
  .next-project {
    display: inline-block;
    color: black;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    font-size: 2rem;
  }
  .next-project__name {
    text-align: end;
    margin-top: 0.4rem;
    span {
      color: white;
    }
  }
}
</style>
