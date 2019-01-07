<template>
  <div
    class="card"
    @click="goToDetail"
  >
    <div :class="['card-title',type=='read'?'':'write-title']">
      <span>阅读课</span><span>Reading</span>
      <img
        v-if="type=='read'"
        class="read-icon"
        src="/static/images/lesson/read-icon.png"
        alt=""
      >
      <img
        v-if="type=='write'"
        class="write-icon"
        src="/static/images/lesson/write-icon.png"
        alt=""
      >
    </div>
    <div class="card-body">
      <div class="body-header">
        <span class="name">Number the Stars</span>
        <span class="people-count"><i class="clock-icon"></i> 还剩2个名额</span>
      </div>
      <div class="suit-age">适合4岁</div>
      <div class="lesson-teacher">
        <span class="item-left">课程教师：</span>
        <span class="item-right">
          {{lessonInfo.teacher}}
        </span>
      </div>
      <div class="lesson-detail">
        <span class="item-left">课程说明：</span>
        <div
          class="item-right"
          v-html="lessonInfo.description"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["type", "lessonInfo"],
  methods: {
    goToDetail() {
      // if (this.lessonInfo.isBooked) {
      this.$router.push(`/lesson/detail?id=${this.lessonInfo.id}`);
      // }
      //  else {
      //   let state = { returnURL: `/lesson/detail`, id: this.lessonInfo.id };
      //   window.location.href = `/weixin/oauth?state=${JSON.stringify(state)}`;
      // }
    }
  }
};
</script>
<style scoped lang='less'>
.card {
  overflow: hidden;
  width: 6.9rem;
  border-radius: 0.04rem;
  font-size: 0.26rem;
  box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.14);
  margin-bottom: 0.3rem;
  .card-title {
    position: relative;
    padding-left: 0.3rem;
    height: 1.16rem;
    line-height: 1.16rem;
    background-image: linear-gradient(to bottom right, #ff585b, #fb8738);
    &.write-title {
      background-image: linear-gradient(to bottom right, #f16028, #fdbf34);
    }
    span {
      color: #fff;
      &:first-child {
        font-size: 0.4rem;
      }
      &:last-child {
        padding-left: 0.2rem;
        font-size: 0.3rem;
      }
    }
    .read-icon {
      width: 1.45rem;
      position: absolute;
      bottom: 0;
      right: 0.14rem;
    }
    .write-icon {
      width: 1.19rem;
      position: absolute;
      bottom: 0;
      right: 0.14rem;
    }
  }
  .card-body {
    padding: 0.3rem;
    color: #606060;
    .body-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 0.4rem;
        color: #2f2f2f;
      }
      .people-count {
        display: flex;
        align-items: center;
        .clock-icon {
          margin-right: 0.15rem;
          width: 0.3rem;
          height: 0.3rem;
          display: inline-block;
          background-image: url(/static/images/lesson/clock-icon.png);
          background-size: contain;
        }
      }
    }
    .suit-age {
      padding: 0.2rem 0;
      color: #979797;
    }
    .lesson-teacher,
    .lesson-detail {
      line-height: 0.36rem;
      .item-left {
        font-weight: bold;
        float: left;
      }
    }
  }
}
</style>