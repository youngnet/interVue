<template>
  <div class="container">
    <div class="title">提现金额</div>
    <div class="input-card">
      <div class="price-line">
        <span class="money-icon">¥</span>
        <input
          type="number"
          class="withdraw-price"
          placeholder="请输入提现金额"
          v-model.number="amount"
        />
      </div>
      <!-- <div class="explain-line">提现手续费 ¥2.32，实际到账 ¥397.00</div> -->
      <div class="explain-line">当前可提现金额¥{{money|toFixed}}</div>
    </div>
    <div class="warm-tip">
      温馨提示：<br>
      提现申请后，会通过公众号以微信红包形式直接发送给您
    </div>
    <a
      href="javascript:;"
      class="default-btn"
      @click="withdraw"
    >申请提现</a>
  </div>
</template>
<script>
export default {
  async created() {
    let res = await this.$ajax.post("/mine/myMoney");
    if (res.cd != 0) {
      this.$toast("获取数据失败");
      return;
    }
    this.money = res.data;
  },
  data() {
    return {
      amount: "",
      money: 0
    };
  },
  metaInfo: { title: "提现" },
  methods: {
    async withdraw() {
      if (!this.amount) {
        return;
      }
      if (this.amount > this.money) {
        this.$toast("提现金额大于可用余额");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "提现中..."
      });
      let res = await this.$ajax.post("/mine/withdraw", {
        amount: this.amount
      });
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      } else {
        this.$toast.success("提现成功");
      }
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  .title {
    font-size: 0.4rem;
    color: #606060;
    padding: 0.7rem 0.3rem 0.3rem;
  }
  .input-card {
    background-color: #fff;
    padding-left: 0.3rem;
    .price-line {
      height: 1.5rem;
      color: #2f2f2f;
      display: flex;
      align-items: flex-end;
      border-bottom: 1px solid #ddd;
      .money-icon {
        font-size: 0.6rem;
        line-height: 0.84rem;
        padding-right: 0.2rem;
      }
      .withdraw-price {
        color: #2f2f2f;
        line-height: 1.1rem;
        font-size: 0.8rem;
      }
    }
    .explain-line {
      padding: 0.3rem 0 0.4rem;
      color: #fd4c4e;
      font-size: 0.3rem;
    }
  }
  .warm-tip {
    padding: 0.3rem;
    font-size: 0.26rem;
    color: #606060;
    background-color: #fffee2;
  }
}
</style>