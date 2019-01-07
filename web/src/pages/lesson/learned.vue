<template>
  <div class="container-learn">
    <div class="course-list">
      <div
        class="course-item"
        v-for="(item,index) of list"
        :key="index"
      >
        <div class="course-name">{{item.courseName}}</div>
        <router-link
          class="go-learn"
          :to="`/lesson/detail?id=${item.id}`"
        >查看</router-link>
      </div>
    </div>
    <pull-up-load
      :page="page"
      :total="totalPage"
      @loadmore="loadmore"
    />
  </div>
</template>
<script>
import PullUpLoad from "@/components/PullUpLoad";
export default {
  components: {
    PullUpLoad
  },
  async created() {
    await this.getList();
  },
  data() {
    return {
      page: 1,
      list: [],
      totalPage: 99
    };
  },
  methods: {
    async getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      let res = await this.$ajax.post("/lesson/learnedList", {
        page: this.page
      });
      this.$toast.clear();
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      }
      this.list = [...this.list, ...res.data.res];
      this.totalPage = res.data.total_page;
      console.log(res);
    },
    async loadmore() {
      this.page++;
      await this.getList();
    }
  }
};
</script>
<style scoped lang='less'>
.container-learn {
  padding-top: 0.3rem;
  .course-list {
    padding-left: 0.3rem;
    .course-item {
      height: 1.68rem;
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
</style>