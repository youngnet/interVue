<template>
  <div class="container">
    <div class="title">
      <span>我的余额</span>
      <router-link to="/mine/walletDetail">查看明细</router-link>
    </div>
    <div class="money-card">
      <div class="price">¥{{money||0|toFixed}}</div>
      <span class="text">可用余额</span>
      <router-link
        to="/mine/withdraw"
        class="incarnate"
      >提现</router-link>
    </div>
    <img
      src="/static/images/wallet/wave.png"
      alt=""
      class="wave"
    >
  </div>
</template>
<script>
export default {
  created () {
    this.getMoney();
  },
  data() {
    return {
      money: ""
    };
  },
  metaInfo: { title: "我的钱包" },
  methods: {
    async getMoney(){
      let res = await this.$ajax.post('/mine/myMoney');
			console.log("​getMoney -> res", res)
      if (res.cd != 0) {
        this.$toast("获取数据失败");
        return;
      }
      this.money = res.data;
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  height: 100vh;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 0.3rem 0;
    span {
      font-size: 0.4rem;
      color: #606060;
      font-weight: bold;
    }
    a {
      font-size: 0.3rem;
    }
  }
  .money-card {
    width: 6.9rem;
    margin: 0.3rem auto;
    background: linear-gradient(to bottom right, #fd4d4e, #fd9a4c);
    border-radius: 0.08rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .price {
      padding-top: 0.7rem;
      font-size: 0.8rem;
    }
    .text {
      font-size: 0.26rem;
    }
    .incarnate {
      color: #fd4c4e;
      font-size: 0.34rem;
      width: 4rem;
      height: 0.88rem;
      border-radius: 0.44rem;
      background-color: #fff;
      text-align: center;
      line-height: 0.88rem;
      margin-bottom: 0.7rem;
      margin-top: 0.7rem;
    }
  }
  .wave {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>