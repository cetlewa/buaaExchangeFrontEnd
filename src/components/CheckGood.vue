<template>
  <div id="check-good" style="">
    <div id="two-button">
      <a-button @click="backToMyGoods">
        返回
      </a-button>
      <a-upload
          name="file"
          :multiple="false"
          action="http://127.0.0.1:5000/ImageUpload"
          accept=".jpg,.png"
          :headers="headers"
          :data="uploadData"
          @change="handleChange"
          style="float: right"
          v-decorator="[
        'imageUpload',
        {
          rules: [
            {
              required: true,
              message: '请上传商品图片！',
            },
          ],
        },
      ]"
      >
        <a-button> <a-icon type="upload" /> 点击上传 </a-button>
      </a-upload>
    </div>
    <div style="">
      <div id="carousel">
        <a-carousel :after-change="onChange" v-if="imgList.length!==0" autoplay>
          <div v-for="v in imgList" :key="v.value" style="">
            <img :src="v.src" alt="" style="height: 180px;margin: 0 auto">
          </div>
        </a-carousel>
      </div>
    </div>


  </div>
</template>

<script>
let imgList = [
  {
    value: '1',
    src: 'https://i.52112.com/icon/256/20131031/298/6505.png',
  },
  {
    value: '1',
    src: 'https://img.zcool.cn/community/01f21a5875fddca801219c774bd034.jpg@1280w_1l_2o_100sh.jpg',
  }
]


export default {
  data() {
    return {
      imgList,
      headers: {
        authorization: 'authorization-text',
      },
      uploadData: {
        "userId": this.$store.state.userID
      }
    }
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    },
    backToMyGoods() {
      this.$router.push('/MyGoods')
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功!`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败!`);
      }
    },
  },
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 180px;
  line-height: 160px;
  background: grey;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: red;
}



#carousel {
  margin: 0 auto;
  width: 50%;
}
</style>