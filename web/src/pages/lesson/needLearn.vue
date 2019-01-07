<template>
  <div class="container-learn">
    <div class="course-month" v-for="(value,key) of list" :key="key">
      <div class="time-line"><span class="date">{{key}}</span><i class="fill-line"></i></div>
      <div class="course-list">
        <div class="course-item" v-for="(item,index) of value" :key="key+index">
          <div class="course-time">
            <span class="date">{{item.startTime|specialFormat}}</span>
            <span class="time">{{item.startTime|clockFormat}}</span>
          </div>
          <div class="course-name">{{item.courseName}}</div>
          <router-link
            v-if="item.isBooked==0"
            class="go-learn"
            :to="`/lesson/detail?id=${item.id}`"
          >立即上课</router-link>
          <div
            v-else
            class="booked"
          ><i class="hook"></i><span>Booked</span></div>
        </div>
        <!-- <div class="course-item">
          <div class="course-time">
            <span class="date">20日星期三</span>
            <span class="time">12:30</span>
          </div>
          <div class="course-name">冰与火之歌</div>
          <div
            v-if="false"
            class="go-learn"
          >立即上课</div>
          <div
            v-else
            class="booked"
          ><i class="hook"></i><span>Booked</span></div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async created() {
    await this.getList();
  },
  data() {
    return {
      page: 1,
      list: {},
      totalPage: 0
    }
  },
  methods: {
    async getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      let res = await this.$ajax.post("/lesson/needLearnList", {
        page: this.page
      });
      this.$toast.clear();
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      }
      this.list = res.data;
      console.log(res);
    }
  }
}
</script>
<style scoped lang='less'>
.container-learn {
  padding-top: 0.3rem;
  .course-month {
    .time-line {
      display: flex;
      align-items: center;
      .date {
        display: inline-block;
        padding-right: 0.3rem;
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
        height: 2rem;
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
          background-color: #e7e7e7;
          padding: 0.18rem;
          border-radius: 0.04rem;
          .date {
            font-size: 0.26rem;
          }
          .time {
            color: #2f2f2f;
            font-size: 0.32rem;
          }
        }
        .course-name {
          flex: 1;
          font-size: 0.32rem;
          color: #606060;
          padding-left: 0.3rem;
        }
        .go-learn {
          width: 1.7rem;
          height: 0.68rem;
          background-color: #fd4c4e;
          color: #fff;
          line-height: 0.68rem;
          text-align: center;
          border-radius: 0.32rem;
          font-size: 0.3rem;
        }
        .booked {
          display: flex;
          align-items: center;
          padding-right: 0.2rem;
          .hook {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            background-size: contain;
            background-image: url("/static/images/hook.png");
            padding-right: 0.1rem;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>