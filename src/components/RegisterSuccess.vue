<template>
  <a-result
      status="success"
      title="注册成功！"
      sub-title="欢迎加入航易购物平台！祝您购物愉快！:)"
  >
    <template #extra>
      <a-button key="tologin" type="primary" @click="$router.push('/Login')">
        前往登录界面
      </a-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a-button key="back" @click="$router.push('/Register')">
        返回注册界面
      </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
