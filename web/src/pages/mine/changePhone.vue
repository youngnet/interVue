<template>
  <div class="container">
    <div class="baseInput">
      <label class="input-item"><span class="label">旧手机号</span><input
          type="text"
          placeholder="请输入旧手机号"
          v-model="phone"
          disabled
        ></label>
      <label class="input-item"><span class="label">新手机号</span><input
          type="text"
          placeholder="请输入新手机号"
          v-model="newPhone"
        ></label>
      <label class="input-item"><span class="label">图形验证码</span><input
          type="text"
          placeholder="请输入图形验证码"
          v-model="graphCode"
        >
        <img
          @click="changeCode"
          :src="src"
          alt=""
          class="item-right img-code"
        >
      </label>
      <label class="input-item"><span class="label">短信验证码</span><input
          type="text"
          placeholder="请输入短信验证码"
          v-model="code"
        >
        <a
          v-if="canGetCode"
          style="color:#3EBDEE;"
          class="getCode item-right"
          href="javascript:;"
          @click="getCode"
        >获取验证码</a>
        <span
          v-else
          class="getCode item-right"
        >剩余{{sec}}s</span>
      </label>
    </div>
    <a
      href="javascript:;"
      class="default-btn"
      @click="save"
    >保存</a>
  </div>
</template>
<script>
let env = process.env.NODE_ENV;
export default {
  async created() {
    this.phone = this.$userInfo.phone;
    this.src = `/getPicCode?phone=${this.phone}`
  },
  data() {
    return {
      phone: "",
      newPhone: "",
      graphCode: "",
      code: "",
      src: "",
      canGetCode: 1,
      sec: 60
    };
  },
  metaInfo: {
    title: "修改绑定手机号"
  },
  methods: {
    //   修改图形验证码
    async changeCode() {
      this.src = `/getPicCode?phone=${this.phone}&time=${Math.random()}`;
    },
    async save() {
      let reg = /^1\d{10}$/;
      if (!this.newPhone) {
        this.$toast("请输入手机号");
        return;
      }
      if (!reg.test(this.newPhone)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      if (!this.code) {
        this.$toast("请输入验证码");
        return;
      }
      // 校验图形验证码
      let res = await this.$ajax.post("/auth/validateCode", {
        phone: this.phone,
        code: this.graphCode
      });
      if (!res.data) {
        this.$toast("图形验证码错误");
        this.src = `/getPicCode?phone=${this.phone}&time=${Math.random()}`;
        return;
      }
      this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true,
        loadingType: 'spinner',
        message:'修改中...'
      })
      let result = await this.$ajax.post("/auth/changePhone", {
        phone: this.phone,
        newPhone: this.newPhone,
        code: this.code
      });
      this.$toast.clear();
      if (result.cd != 0) {
        this.$toast(result.msg) 
        return 
      }
      this.$toast('修改成功') 
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },

    // 获取短信验证码
    async getCode() {
      if (this.canGetCode == 0) {
        return;
      }
      this.canGetCode = 0;
      let res = await this.$ajax.post("/auth/getCode", {
        phone: this.phone,
        type: "CHANGE_PHONE"
      });

      if (!res.data || res.data.status_code != "OK") {
        res.data = res.data || {};
        this.canGetCode = 1;
        this.sec = 60;
        if (res.data.status_code == "isv.BUSINESS_LIMIT_CONTROL") {
          this.$toast("发送频繁，请稍后重试");
        } else if (res.data.status_code == "isv.MOBILE_NUMBER_ILLEGAL") {
          this.$toast("手机号码格式错误");
        } else {
          this.$toast("发送验证码失败");
        }
        return;
      }
      if (env === "development") {
        this.code = JSON.parse(res.msg).code;
      }
      this.$toast("验证码已发送到您的手机10分钟内输入有效");
      this.countDown();
    },
    // 发送验证码倒计时
    countDown() {
      let timer = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timer);
          this.canGetCode = 1;
          this.sec = 60;
        }
      }, 1000);
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  padding-top: 0.3rem;
  .label {
    width: 1.6rem;
  }
  .img-code {
    width: 1.4rem;
    height: 0.5rem;
  }
  input:disabled{
    background-color: #fff;
  }
}
</style>