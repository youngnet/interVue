<template>
  <div>
    register
  </div>
</template>
<script>
export default {
  created() {
    let state = { returnURL: "/login", scope: "snsapi_userinfo" };
    window.location.href = `/weixin/oauth?state=${JSON.stringify(state)}`
  },
  data() {
    return {};
  }
};
</script>
<style scoped lang='less'>
</style>