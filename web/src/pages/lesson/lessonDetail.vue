<template>
  <div class="container">
    <div class="banner">
      <img
        class="banner-img"
        src="/static/images/lesson/lessonBanner.png"
      />
      <img
        v-if="lessonDetail.isBooked"
        src="/static/images/lesson/lesson-booked.png"
        alt=""
        class="booked"
      >
    </div>
    <div class="lesson">
      <div class="lesson-title">{{lessonDetail.courseName}}</div>
      <div class="lesson-body">
        <div class="lesson-line">
          <div class="name">
            <i class="date"></i>
            <span>课程时间</span>
          </div>
          <div
            class="text"
            style="font-weight:500;"
          >{{lessonDetail.startTime|dayFormat}} {{lessonDetail.startTime|weekFormat}} {{lessonDetail.startTime|clockFormat}}-{{lessonDetail.endTime|clockFormat}}</div>
        </div>
        <div class="lesson-line">
          <div class="name">
            <i class="wallet"></i>
            <span>课程价格</span>
          </div>
          <div
            class="text"
            style="font-weight:500;"
          >{{lessonDetail.price||0|toFixed}}元新币<span style="color:#FD4C4E;">（251.64人民币）</span></div>
        </div>
        <div class="lesson-line">
          <div class="name">
            <i class="book"></i>
            <span>课程简介</span>
          </div>
          <div
            class="text"
            v-html="lessonDetail.description"
          ></div>
        </div>
      </div>
    </div>
    <a
      v-if="lessonDetail.isBooked==1"
      href="javascript:;"
      class="default-btn cancel"
      @click="cancel"
    >取消预约</a>
    <a
      v-if="lessonDetail.isBooked==0"
      href="javascript:;"
      class="bottom-btn"
      @click="pay"
    >立即预定</a>
  </div>
</template>
<script>
// status 0未发布,1已发布,2进行中,3已结束
import weixin from "@/utils/weixin";
export default {
  async created() {
    await this.getDetail();
  },
  data() {
    return {
      lessonDetail: {},
      canCancel: 1
    };
  },
  metaInfo: { title: "课程详情" },
  methods: {
    async getDetail() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      let res = await this.$ajax.post("/lesson/detail", {
        id: this.$route.query.id
      });
      this.$toast.clear();
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      }
      this.lessonDetail = res.data;
    },
    async pay() {
      // let res = await this.$ajax.post("/lesson/bookCourse", {
      //   courseId: this.$route.query.id,
      //   wxOpenId: "ovJsI0nN2Ilp-iDWu_YJjG2Nu3r4"
      // });
      // console.log(res);
      // if (res.cd != 0) {
      //   return;
      // }
      // // let result = await weixin.initPay(res.data);
      // weixin.pay(res.data);
      let state = { id: this.$route.query.id, returnURL: "/pay/course" };
      window.location.href = `/weixin/oauth?state=${JSON.stringify(state)}`;
    },
    async cancel() {
      this.canCancel = 0;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "取消中..."
      });
      let res = await this.$ajax.post("/lesson/bookCancel", {
        courseId: this.$route.query.id
      });
      this.$toast.clear();

      if (res.cd != 0) {
        this.$toast(res.msg);
        this.canCancel = 1;
        return;
      }
      this.$toast("取消成功");
      setTimeout(async () => {
        this.canCancel = 1;
        await this.getDetail();
      },1000)
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  .banner {
    position: relative;
    padding-bottom: 0.3rem;
    font-size: 0;
    .banner-img {
      width: 100%;
    }
    .booked {
      position: absolute;
      top: 0;
      right: 0;
      width: 1.83rem;
      height: 0.68rem;
    }
  }
  .lesson {
    background-color: #fff;
    padding-left: 0.3rem;
    .lesson-title {
      font-weight: 500;
      font-size: 0.4rem;
      color: #2f2f2f;
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #ddd;
    }
    .lesson-body {
      padding-top: 0.3rem;
      .lesson-line {
        padding: 0 0.3rem 0.3rem 0;
        display: flex;
        align-items: flex-start;
        .name {
          line-height: 0.42rem;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          color: #979797;
          font-size: 0.3rem;
          i {
            display: inline-block;
            width: 0.32rem;
            height: 0.3rem;
            background-size: contain;
            margin-right: 0.2rem;
          }
          .date {
            background-image: url(/static/images/icons/date.png);
          }
          .book {
            background-image: url(/static/images/icons/book.png);
          }
          .wallet {
            background-image: url(/static/images/icons/wallet.png);
          }
        }
        .text {
          padding-left: 0.2rem;
          font-size: 0.3rem;
          line-height: 0.42rem;
        }
      }
    }
  }
  .bottom-btn {
    width: 100%;
    height: 0.88rem;
    background-color: #fd4c4e;
    color: #fff;
    font-size: 0.34rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    line-height: 0.88rem;
  }
}
</style>