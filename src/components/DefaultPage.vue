<template>
  <div id="default-page">
    <a-carousel autoplay>
      <div><img src="@/assets/lby_pic.png"></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
<!--    <a-input-search placeholder="请输入查询的商品" enter-button />-->
    <h1 style="text-align: center;font-size: xxx-large;margin-top: 60px">欢迎访问航易-BUAA EXCHANGE</h1>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 320px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
