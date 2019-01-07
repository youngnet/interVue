<template>
  <div class="container">
    <div class="navigator">
      <a
        :class="['link',navigator==1?'active':'']"
        @click="changeRoute('/mine/course/needLearn',1)"
      >待上课</a>
      <a
        :class="['link',navigator==2?'active':'']"
        @click="changeRoute('/mine/course/learned',2)"
      >往期回放</a>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  created () {
    if (this.$route.path.indexOf('learned') != -1) {
      this.navigator = 2;
    }
  },
  data() {
    return {
      navigator:1
    };
  },
  metaInfo: { title: "我的课程" },
  methods: {
    changeRoute(url,navigator) {
      this.navigator = navigator;
      this.$router.replace(url);
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  background-color: #fff;
  min-height: 100vh;
  .navigator {
    display: flex;
    font-size: 0.32rem;
    height: 0.88rem;
    align-items: center;
    text-align: center;
    background-color: #f3f3f3;
    .link {
      position: relative;
      line-height: 0.88rem;
      flex: 1;
      color: #747474;
      background-color: #eee;
      &.active {
        color: #fd4c4e;
        background-color: #fff;
        &::after {
          content: "";
          position: absolute;
          width: 0.6rem;
          height: 0.04rem;
          background-color: #fd4c4e;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          border-radius: 0.02rem;
        }
      }
    }
  }
}
</style>