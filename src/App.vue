<template>
  <div class="container">
    <div class="column-line column-line-1"></div>
    <div class="column-line column-line-3"></div>
    <div class="column-line column-line-5"></div>
    <div class="column-line column-line-2"></div>
    <div class="column-line column-line-4"></div>
  </div>
  <router-view />
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  .column-line {
    @include column-line;
  }
}

.column-line-1 {
  left: $mobile-column-line-1-left;
}
.column-line-3 {
  left: $mobile-column-line-3-left;
}
.column-line-5 {
  right: $mobile-column-line-5-right;
}
.column-line-2 {
  left: $column-line-2-left;
  visibility: hidden;
}
.column-line-4 {
  left: $column-line-4-left;
  visibility: hidden;
}

@media screen and (min-width: 1000px) {
  .column-line-1 {
    left: $column-line-1-left;
  }
  .column-line-3 {
    left: $column-line-3-left;
  }
  .column-line-5 {
    left: $column-line-5-left;
  }
  .column-line-2,
  .column-line-4 {
    visibility: visible;
  }
}
</style>
