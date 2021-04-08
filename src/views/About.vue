<template>
  <LeaveAnimation />
  <main ref="scrollRef">
    <article>
      <h1>About</h1>
      <p>
        안녕하세요. 여러분은 지금 개발자가 되고자 하는 비전공 무경력자의 포트폴리오를 보고 있어요.
        만약 여기서 창을 닫지 않았다면 계속 읽어주세요.
      </p>
      <p>
        저는 대학에서 역사를 공부했어요. 누군가 그러더군요, 이 전공으로는 고대 그리스에서나 취직이
        가능하다고. 경영학도 복수전공을 했어요. 하지만 그렇게 궁합이 좋진 못했어요. 그런데 막상
        성적은 경영학 수업을 들을 때가 가장 좋았어요. 장학금도 타고요. 아이러니 하네요.
      </p>
      <p class="welding">
        저의 첫번째 직업은 용접사였어요. 그 이전에도 하던 몇가지 하던 일이 있었지만 직업으로 칠 수
        있을지 모르겠네요.
      </p>
      <p class="barista">
        두번째 직업은 바리스타였어요. 프랜차이즈 커피 전문점 부점장이었죠
      </p>
      <p class="bicycle">
        그리고 자전거로 서울에서 모로코까지 갔다 왔어요. 2년이 걸렸고,
      </p>
      <p>
        그런데 어깨를 다쳐서 예전에 하던 일을 할 수 없게 됐어요. 그래서 웹개발을 하게 됐어요. 키보드
        치는건 어깨가 안 아프더라고요. 프로그래밍에 대한 열정, 사랑, 이런 거 없었어요. 그냥 먹고 살
        길은 있어야 겠으니까 시작했어요. 그런데 나쁘지 않아요. 재미있어요.
      </p>
    </article>
  </main>
</template>

<script lang="ts">
import LeaveAnimation from '@/components/LeaveAnimation.vue';
import useLocomitive from '@/hooks/useLocomotive.vue';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  components: { LeaveAnimation },
  setup() {
    const { scrollRef, ScrollTrigger } = useLocomitive();

    onMounted(() => {
      ScrollTrigger.refresh(true);
    });

    return {
      scrollRef,
    };
  },
});
</script>

<style lang="scss" scoped>
article {
  @include mobile-23-desktop-2345__margins;
  padding-top: 10vh;
  color: white;
  h1 {
    font-size: 5rem;
    font-weight: 600;
  }
  p {
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.5rem;
    margin: 3rem 0;
    span {
      font-size: 1rem;
      font-weight: 400;
    }
  }
}
</style>
