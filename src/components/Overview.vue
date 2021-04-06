<template>
  <article class="overview__container">
    <section class="overview__left-column">
      <span>Created by</span>
      <span>Jinseok Bang</span>
    </section>
    <section class="overview__right-column">
      <span>Overview</span>
      <div class="overview">
        <h5>Polartypes and Polarsteps</h5>
        <p>
          Polarsteps는 전세계의 여행자들과 모험가들을 위한 소셜 네트워크 서비스를 제공하고 있어요.
          자바스크립트를 처음 배울 때부터 꼭 클론코딩을 해보고자 마음 먹었던 곳이에요. 그래서 저에겐
          다른 프로젝트들보다도 더 의미가 깊어요.
        </p>
      </div>
      <div class="overview">
        <h5>Fullstack</h5>
        <p>
          단순히 눈에 보이는 것만 클론코딩 한 것이 아니에요. Nestjs와 GraphQL을 사용해서 Account,
          Trip, Step 그리고 Comment까지 CRUD를 구축했어요.
        </p>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Overview',
});
</script>

<style lang="scss" scoped>
.overview__container {
  @include mobile-23-desktop-2345__margins;
  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  display: grid;
  color: white;
  .overview__left-column,
  .overview__right-column {
    padding: 1rem 0;
  }
  .overview__left-column {
    span {
      display: block;
      margin-bottom: 0.2rem;
      font-size: 0.8rem;
    }
  }
  .overview__right-column {
    border-top: 1px solid white;
    span {
      font-size: 0.8rem;
    }
    .overview {
      padding: 1rem 0;
      h5 {
        margin: 1rem 0 1.5rem 0;
        font-size: 2rem;
        font-weight: 600;
      }
      p {
        font-size: 0.9rem;
        font-weight: 300;
        line-height: 1.5rem;
      }
    }
  }
}
</style>
