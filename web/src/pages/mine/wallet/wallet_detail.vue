<template>
  <div class="container">
    <div class="navigator">
      <a
        @click="changeType(0)"
        :class="['link',navigateType=='0'?'active':'']"
        href="javascript:;"
      >全部</a>
      <a
        @click="changeType(1)"
        :class="['link',navigateType=='1'?'active':'']"
        href="javascript:;"
      >收入</a>
      <a
        @click="changeType(2)"
        :class="['link',navigateType=='2'?'active':'']"
        href="javascript:;"
      >支出</a>
    </div>
    <div class="course-month">
      <!-- <div class="time-line"><span class="date">2018年9月</span><i class="fill-line"></i></div> -->
      <div class="course-list">
        <div
          class="course-item"
          v-for="(item,index) of list"
          :key="index"
        >
          <div class="course-time">
            <span class="date">{{item.actionTitle}}</span>
            <span class="time">{{item.createTime}}</span>
          </div>
          <div class="booked"><span>¥{{item.amount|toFixed}}</span></div>
        </div>

      </div>
    </div>
    <pull-up-load :page="page" :total="totalPage" @loadmore="emitList"/>
  </div>
</template>
<script>
import PullUpLoad from "@/components/PullUpLoad";
export default {
  async created() {
    await this.getList();
  },
  data() {
    return {
      navigateType: 0,
      page: 1,
      totalPage: 99,
      list: []
    };
  },
  metaInfo: { title: "钱包明细" },
  components: {
    PullUpLoad
  },
  methods: {
    changeType(type) {
      if (type === this.navigateType) {
        return;
      }
      this.list = [];
      this.page = 1;
      this.navigateType = type;
      this.getList();
    },
    async getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      let res = await this.$ajax.post("/mine/dealDetail", {
        page: this.page,
        status: this.navigateType
      });
      // console.log(res);
      this.$toast.clear();
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      }
      this.list = [...this.list, ...res.data.res];
      this.page = res.data.page;
      this.totalPage = res.data.total_page;
    },
    async emitList() {
      this.page++;
      await this.getList();
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
  .course-month {
    padding-top: 0.3rem;
    .time-line {
      display: flex;
      align-items: center;
      .date {
        display: inline-block;
        width: 2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background-color: #ffeded;
        color: #fd4c4e;
        padding-left: 0.22rem;
        border-radius: 0 0.25rem 0.25rem 0;
      }
      .fill-line {
        height: 1px;
        background-color: #ddd;
        flex: 1;
      }
      font-size: 0.3rem;
    }
    .course-list {
      padding-left: 0.3rem;
      .course-item {
        height: 1.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0.3rem;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: unset;
        }
        .course-time {
          display: flex;
          flex-direction: column;
          padding: 0.18rem;
          .date {
            color: #2f2f2f;
            font-size: 0.32rem;
            margin-bottom: 0.1rem;
          }
          .time {
            font-size: 0.26rem;
            color: #979797;
          }
        }
        .course-name {
          flex: 1;
          font-size: 0.32rem;
          color: #606060;
          padding-left: 0.3rem;
        }
        .booked {
          display: flex;
          align-items: center;
          padding-right: 0.2rem;
          font-size: 0.32rem;
          color: #2f2f2f;
        }
      }
    }
  }
}
</style>