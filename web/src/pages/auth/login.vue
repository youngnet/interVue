<template>
  <div class="container">
    <div class="info-put">
      <div class="phone">
        <span class="preNumber">+86</span>
        <div style="width:1px;height:0.4rem;background-color:#ddd;margin:0 0.2rem;"></div>
        <input
          type="number"
          placeholder="请输入手机号码"
          v-model="phone"
          @input="slice11"
        >
      </div>
      <div class="identifyCode">
        <input
          type="number"
          placeholder="请输入验证码"
          v-model="identifyCode"
          @input="slice6"
        >
        <a
          v-if="canGetCode"
          style="color:#3EBDEE;"
          class="countDown"
          href="javascript:;"
          @click="getCode"
        >获取验证码</a>
        <span
          v-else
          class="countDown"
        >剩余{{sec}}s</span>
      </div>
    </div>
    <a
      href="javascript:;"
      class="default-btn"
      @click="login"
    >登录</a>
    <p class="allow-protocol">
      登录代表您已同意双语国际<a href="javascript:;">《注册协议》</a>内容
    </p>
    <a
      href="javascript:;"
      class="weixin-login"
      @click="wxLogin"
    >
      <img
        src="/static/images/weixin-icon.png"
        alt=""
      >
      <span>微信登录</span>
    </a>
    <div class="bottom-fill1"></div>
    <div class="bottom-fill2"></div>
  </div>
</template>
<script>
let env = process.env.NODE_ENV;
import qs from "qs";
export default {
  created() {},
  data() {
    return {
      phone: "",
      identifyCode: "",
      canGetCode: 1,
      sec: 60,
      type: "LOGIN"
    };
  },
  metaInfo: {
    title: "登录"
  },
  methods: {
    slice11(e) {
      this.phone = e.target.value.slice(0, 11);
    },
    slice6(e) {
      this.identifyCode = e.target.value.slice(0, 6);
    },
    // 登录
    async login() {
      if (this.checkField()) {
        if (this.type === "REG") {
          this.register();
          return;
        }
        let res = await this.$ajax.post("/auth/login", {
          phone: this.phone,
          code: this.identifyCode
        });
        if (res.cd != 0) {
          this.$toast(res.msg);
          return;
        }
        if (this.$route.query.t) {
          this.$router.push(this.$route.query.t);
        } else {
          this.$router.push("/mine");
        }
      }
    },
    checkField() {
      let reg = /^1\d{10}$/;
      if (!this.phone) {
        this.$toast("请输入手机号");
        return;
      }
      if (!reg.test(this.phone)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      if (!this.identifyCode) {
        this.$toast("请输入验证码");
        return;
      }
      return true;
    },
    // 注册
    async register() {
      let { openid, wxname, wxhead, qrcode } = this.$route.query;
      let res = await this.$ajax.post("/auth/reg", {
        openid,
        wxname,
        wxhead,
        qrcode,
        phone: this.phone,
        code: this.identifyCode
      });
      if (res.cd != 0) {
        this.$toast(res.msg);
        this.canGetCode = 1;
        this.sec = 60;
        this.identifyCode = "";
        return;
      }
      this.$router.push("/auth/baseInfo");
    },
    async wxLogin() {
      let { openid, t, wxname, wxhead, qrcode } = this.$route.query;
      let res = await this.$ajax.post("/auth/wxlogin", { openid });
      if (res.cd == 0) {
        if (t) {
          this.$router.push(t);
        } else {
          this.$router.push("/mine");
        }
      } else if (res.cd == 2) {
        this.$toast(res.msg);
        this.$router.push(`/auth/bindPhone?openid=${openid}&wxname=${wxname}&wxhead=${wxhead}&qrcode=${qrcode}`);
      } else {
        this.$toast(res.msg);
      }
    },
    // 获取短信验证码
    async getCode() {
      if (this.canGetCode == 0) {
        return;
      }
      if (!this.phone) {
        this.$toast('请输入手机号');
        return;
      }
      this.canGetCode = 0;
      // 判断手机号是否注册过
      let result = await this.$ajax.post("/auth/validatePhone", {
        phone: this.phone
      });
      if (result.cd == 1) {
        this.type = "REG";
      } else {
        this.type = "LOGIN";
      }
      let res = await this.$ajax.post("/auth/getCode", {
        phone: this.phone,
        type: this.type
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
        this.identifyCode = JSON.parse(res.msg).code;
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
  .info-put {
    padding: 1rem 0.6rem 0;
    font-size: 0.32rem;
    input {
      background: #f3f3f3;
    }
    .phone,
    .identifyCode {
      display: flex;
      align-items: center;
      height: 1.08rem;
      border-bottom: 1px solid #ddd;
      input {
        font-size: 0.32rem;
        height: 100%;
      }
      .countDown,
      .preNumber {
        flex-shrink: 0;
        height: 100%;
        line-height: 1.08rem;
      }
    }
  }
  .allow-protocol {
    font-size: 0.26rem;
    text-align: center;
    color: #979797;
  }
  .weixin-login {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    color: #606060;
    font-size: 0.26rem;
    align-items: center;
    img {
      width: 1rem;
      height: 0.8rem;
      margin-bottom: 0.15rem;
    }
  }
  .bottom-fill1 {
    background: linear-gradient(to bottom right, #ff585b, #fe6c2c);
    width: 3.24rem;
    height: 3.24rem;
    border-radius: 50%;
    position: fixed;
    right: -0.8rem;
    bottom: -1.18rem;
  }
  .bottom-fill2 {
    background: #ffc816;
    width: 2.27rem;
    height: 2.27rem;
    border-radius: 50%;
    position: fixed;
    right: 1.6rem;
    bottom: -1.3rem;
  }
}
</style>