<template>
  <div>
    <img
      src="/static/images/extend_banner.png"
      alt=""
      class="banner"
    >
    <div class="base-list first">
      <router-link
        to="/mine/extend_month_list"
        class="list-item"
      >
        <div class="item-left">我的推广课程</div>
        <div class="item-mid">{{extendInfo.myInviteCourseCount}}节课</div>
        <i class="item-right"></i>
      </router-link>
      <router-link class="list-item" to="/mine/my_team_list">
        <div class="item-left">我的团队</div>
        <div class="item-mid">{{extendInfo.myTeamCount}}个</div>
        <i class="item-right"></i>
      </router-link>
      <div class="list-item">
        <div class="item-left">我的团队-推广课程</div>
        <div class="item-mid">{{extendInfo.myTeamInviteCourseCount}}节课</div>
        <i class="item-right"></i>
      </div>
    </div>

    <div class="base-list sec">
      <div class="list-item">
        <div class="item-left">我的推广业绩</div>
        <div class="item-mid">¥{{(extendInfo.myInviteBonus||0)|toFixed}}</div>
      </div>
      <div class="list-item">
        <div class="item-left">我的团队推广业绩</div>
        <div class="item-mid">¥{{(extendInfo.myTeamInviteBonus||0)|toFixed}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async created() {
    console.log(this.$userInfo)
    await this.getInfo();
  },
  data() {
    return {
      extendInfo:{}
    };
  },
  methods: {
    async getInfo() {
      let res = await this.$ajax.post("/courseInvite/inviteCenter");
      // console.log("​getInfo -> res", res);
      if (res.cd != 0) {
        this.$toast("获取数据失败");
        return;
      }
      this.extendInfo = res.data;
    }
  }
};
</script>
<style scoped lang='less'>
.banner {
  width: 100%;
}
.sec {
  margin-top: 0.3rem;
}
</style>