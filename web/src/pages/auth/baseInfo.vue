<template>
  <div class="container">
    <div class="baseInput">
      <label class="input-item"><span class="label">孩子姓名</span><input
          type="text"
          placeholder="请输入孩子姓名"
          v-model="childrenName"
        ></label>
      <label class="input-item"><span class="label">孩子年龄</span><input
          type="number"
          placeholder="请输入孩子年龄"
          v-model="childrenAge"
        ></label>
      <label class="input-item"><span class="label">孩子学校</span><input
          type="text"
          placeholder="请输入孩子学校"
          v-model="childrenSchool"
        ></label>
      <label class="input-item"><span class="label">父母姓名</span><input
          type="text"
          placeholder="请输入父母姓名"
          v-model="parentName"
        ></label>
      <label class="input-item"><span class="label">联系方式</span><input
          type="number"
          placeholder="请输入父母联系方式"
          v-model="parentPhone"
          @input="slice11"
        ></label>
    </div>
    <a
      href="javascript:;"
      class="default-btn"
      @click="save"
    >提交</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      childrenName: "",
      childrenAge: "",
      childrenSchool: "",
      parentName: "",
      parentPhone: ""
    };
  },
  metaInfo: {
    title: "填写基本信息"
  },
  methods: {
    checkFields() {
      if (
        !this.childrenName ||
        !this.childrenAge ||
        !this.childrenSchool ||
        !this.parentName ||
        !this.parentPhone
      ) {
        this.$toast("请完善信息");
        return;
      }
      return true;
    },
    async save() {
      if (this.checkFields()) {
        let res = await this.$ajax.post("/auth/addFamily", {
          childrenName: this.childrenName,
          childrenAge: this.childrenAge,
          childrenSchool: this.childrenSchool,
          parentName: this.parentName,
          parentPhone: this.parentPhone
        });
        if (res.cd != 0) {
          this.$toast(res.msg);
          return;
        }
        this.$router.replace("/mine");
      }
    },
    slice11(e) {
      this.parentPhone = e.target.value.slice(0, 11);
    }
  }
};
</script>
<style scoped lang='less'>
.container {
  padding-top: 0.3rem;
  background-color: #f3f3f3;
  height: 100vh;
  .baseInput {
    background-color: #fff;
  }
}
</style>