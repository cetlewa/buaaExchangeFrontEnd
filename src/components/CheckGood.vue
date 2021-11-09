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
          :headers="headers"
          accept=".jpg,.png,.jpeg"
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
            <img :src="v.picUrl" alt="" style="height: 220px;margin: 0 auto">
<!--            可以添加的功能：删除图片（初步想法：双击删除）-->
          </div>
        </a-carousel>
      </div>
    </div>
    <br>

    <a-descriptions title="" bordered :column="2">
      <a-descriptions-item label="商品名">
        {{this.goodName}}
      </a-descriptions-item>
      <a-descriptions-item label="商品类别">
        {{this.goodType}}
      </a-descriptions-item>
      <a-descriptions-item label="卖家">
        {{this.sellerName}}
      </a-descriptions-item>
      <a-descriptions-item label="价格">
        ￥{{this.goodPrice}}
      </a-descriptions-item>
      <a-descriptions-item label="商品描述" :span="2">
        {{this.goodDescription}}
      </a-descriptions-item>
    </a-descriptions>


  </div>
</template>

<script>
let imgList = []

export default {
  data() {
    return {
      imgList,
      goodName: '',
      goodType: '',
      sellerName: '',
      goodPrice: '',
      goodDescription: '',
      headers: {
        authorization: 'authorization-text',
      },
      uploadData: {
        "userId": this.$store.state.userID,
        "goodId": this.$store.state.goodId
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
        this.$message.success(`${info.file.name} 上传成功！`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败！仅支持.jpg和.png格式文件！`);
      }
    },
  },
  created() {
    let that = this
    this.$axios.post(this.$store.state.ip + "QueryPictures", {
      "goodId": this.$store.state.goodId
    }).then((response) => {
      console.log(response.data)
      that.imgList = response.data
    })
    this.$axios.post(this.$store.state.ip + "QueryGoodsInfo", {
      "goodId": this.$store.state.goodId
    }).then((response) => {
      that.goodName = response.data.goodName
      that.goodPrice = response.data.goodPrice
      that.goodType = response.data.goodType
      that.sellerName = response.data.sellerName
      that.goodDescription = response.data.goodDescription
    })
  },
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 220px;
  line-height: 160px;
  background: wheat;
  overflow: hidden;
}


#carousel {
  margin: 0 auto;
  width: 50%;
}
</style>