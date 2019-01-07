<template>
  <div
    class="box"
    v-show="isShow"
  >
    <span v-if="haveMore">加载中...</span>
    <span v-else>没有更多了</span>
  </div>
</template>
<script>
export default {
  props: ["page", "total"],
  data() {
    return {
      haveMore: true,
      isShow: false
    };
  },
  mounted() {
    this.listenScroll();
  },
  methods: {
    listenScroll() {
      window.onscroll = () => {
        setTimeout(async () => {
          let scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
          let clientHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop + clientHeight >= scrollHeight - 3) {
            this.isShow = true;
            if (this.page == this.total) {
              this.haveMore = false;
            } else {
              await this.$emit("loadmore");
              this.isShow = false;
            }
          }
        }, 10);
      };
    },
    hide() {
      this.isShow = false;
    }
  }
};
</script>
<style scoped lang='less'>
.box {
  display: flex;
  justify-content: center;
  line-height: 25px;
  align-items: center;
}
</style>