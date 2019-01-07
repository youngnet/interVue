<template>
  <div class="container">
    <div class="base-list">
      <div v-for="(item,index) of list" :key="index" class="list-item">
        <div class="item-left">{{item.courseName}}</div>
        <div class="item-mid">{{item.phone}}</div>
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
      let res = await this.$ajax.post(
        "/courseInvite/myInviteCourseListByMonth",
        { inviteMonth: this.$route.query.month }
      );
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