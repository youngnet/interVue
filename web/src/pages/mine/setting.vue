<template>
  <div class="container">
    <p class="name">{{name}}</p>
    <router-link
      class="goToSetting"
      to="/mine/changePhone"
    ><span style="color:#606060;">已绑定手机号</span><span class="phone">{{phone}}</span><i class="right-arrow"></i></router-link>
  </div>
</template>
<script>
export default {
  created() {
    this.phone = this.$userInfo.phone;
    this.name =
      this.$userInfo.name ||
      decodeURIComponent(this.$userInfo.wxName || "") ||
      "yang";
  },
  data() {
    return {
      phone: "",
      name: ""
    };
  },
  metoInfo: { title: "账户设置" }
};
</script>
<style scoped lang='less'>
.container {
  .name {
    font-size: 0.4rem;
    padding: 0.7rem 0.3rem 0.3rem;
  }
  .goToSetting {
    position: relative;
    display: block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.3rem;
    padding-right: 0.66rem;
    background-color: #fff;
    height: 1rem;
    font-size: 0.32rem;
    color: #2f2f2f;
    .right-arrow {
      position: absolute;
      right: 0.3rem;
      background-image: url("/static/images/right-arrow.png");
      display: inline-block;
      width: 0.16rem;
      height: 0.28rem;
      background-size: contain;
    }
  }
}
</style>