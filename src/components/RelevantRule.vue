<template>
  <div style="height: 100%;position: relative">
    <div id="relevant-rule">
      <div style="height: 50%">
        好好学习
      </div>
      <div style="height: 50%">
        天天向上
      </div>
    </div>

    <div id="relevant-rule-button">
      <a-button @click="getback" icon="bulb">
        已知晓，返回
      </a-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "RelevantRule",
  methods: {
    getback() {
      this.$router.push('/Register')
    }
  }
}
</script>

<style scoped>
#relevant-rule {
  text-align: center;
  font-size: 150px;
  height: 80%;
  /*margin-bottom: 6%;*/
}

#relevant-rule-button {
  /*text-align: center;*/
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>