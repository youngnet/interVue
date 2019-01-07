<template>
  <div class="container">
    <div class="base-list">
      <router-link
        v-for="(item,index) of list"
        :key="index"
        :to="'/mine/extend_detail?month='+item.inviteMonth"
        class="list-item"
      >
        <div class="item-left">{{item.inviteMonth}}</div>
        <div class="item-mid">{{item.inviteCount}}节课</div>
        <i class="item-right"></i>
      </router-link>
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
      list: []
    };
  },
  metaInfo: { title: "我的推广课程" },
  methods: {
    async getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      let res = await this.$ajax.post("/courseInvite/myInviteCourseMonthList");
      this.$toast.clear();
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      }
      this.list = res.data;
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  padding-top: 0.3rem;
}
</style>