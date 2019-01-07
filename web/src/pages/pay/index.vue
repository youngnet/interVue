<template>
  <div>

  </div>
</template>
<script>
import weixin from "@/utils/weixin";
export default {
  created() {
    // console.log(this.$userInfo);
    this.pay();
  },
  data() {
    return {};
  },
  metaInfo: { title: "支付" },
  methods: {
    async pay() {
      let { id, openid } = this.$route.query;
      if (!id || !openid) {
        this.$router.go(-1);
      }
      let res = await this.$ajax.post("/lesson/bookCourse", {
        courseId: id,
        wxOpenId: openid
      });
      console.log(res);
      if (res.cd != 0) {
        this.$toast("支付失败");
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
        return;
      }
      // let result = await weixin.initPay(res.data);
      let payResult = await weixin.pay(res.data);
      if (payResult.cd != 0) {
        this.$toast("支付失败");
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
        return;
      } else {
        this.$router.replace(`/lesson/detail?id=${id}`);
      }
    }
  }
};
</script>
<style scoped lang='less'>
</style>