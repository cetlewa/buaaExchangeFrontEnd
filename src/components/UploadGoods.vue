<template>
  <div id="upload-goods">
    <a-button>
      <router-link to="MyGoods">
        <span style="color: grey">
          返回
        </span>
      </router-link>
    </a-button>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="商品名" has-feedback>
        <a-input
            v-decorator="[
          'goodName',
          {
            rules: [
              {
                pattern: '^.{1,20}$',
                message: '输入不合规范！最多支持20个字符',
              },
              {
                required: true,
                message: '请输入商品名！',
              },
            ],
          },
        ]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="商品类别" has-feedback>
        <a-select default-value="1" v-decorator="[
          'goodType',
          {
            rules: [
                {
                  required: true,
                  message: '请选择商品类别！'
                },
              ]
          }
        ]">
          <a-select-option value="1">
            电子类
          </a-select-option>
          <a-select-option value="2">
            学习类
          </a-select-option>
          <a-select-option value="3">
            食品类
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="商品价格" has-feedback>
        <a-input
            v-decorator="[
          'goodPrice',
          {
            rules: [
              {
                pattern: '^[0-9]{1,20}$',
                message: '输入不合规范！最多支持20位数字',
              },
              {
                required: true,
                message: '请输入商品价格！',
              },
            ],
          },
        ]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="商品描述" has-feedback>
        <a-textarea
          placeholder="商品描述"
          :auto-size="{ minRows: 4, maxRows: 10 }"
          v-decorator="[
          'goodDescription',
          {
            rules: [
              {
                pattern: '^.{1,100}$',
                message: '输入不合规范！最多支持100个字符',
              },
              {
                required: true,
                message: '请输入商品描述！',
              },
            ],
          },
        ]"
        ></a-textarea>
      </a-form-item>
<!--      <a-form-item v-bind="formItemLayout" label="商品图片">-->
<!--        <a-upload-->
<!--            name="file"-->
<!--            :multiple="false"-->
<!--            action="http://127.0.0.1:5000/ImageUpload"-->
<!--            :headers="headers"-->
<!--            :data="uploadData"-->
<!--            @change="handleChange"-->
<!--            v-decorator="[-->
<!--          'imageUpload',-->
<!--          {-->
<!--            rules: [-->
<!--              {-->
<!--                required: true,-->
<!--                message: '请上传商品图片！',-->
<!--              },-->
<!--            ],-->
<!--          },-->
<!--        ]"-->
<!--        >-->
<!--          <a-button> <a-icon type="upload" /> 点击上传 </a-button>-->
<!--        </a-upload>-->
<!--      </a-form-item>-->
      <!--      <a-form-item v-bind="tailFormItemLayout" style="margin-bottom: 10px">-->
      <!--        <a-checkbox v-decorator="[-->
      <!--            'agreement',-->
      <!--            {-->
      <!--              valuePropName: 'checked',-->
      <!--            },-->
      <!--            ]">-->
      <!--          我已阅读-->
      <!--          <router-link to="/RelevantRule">-->
      <!--            相关条约-->
      <!--          </router-link>-->
      <!--          并同意-->
      <!--        </a-checkbox>-->
      <!--      </a-form-item>-->
      <div style="text-align: center">
        <a-button type="primary" html-type="submit">
          上传
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checkNick: true,
      confirmDirty: false,
      goodName: '',
      headers: {
        authorization: 'authorization-text',
      },
      uploadData: {
        userId: this.$store.state.userID
      },
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.goodName = values.goodName
          console.log('Received values of form: ', values);
          this.$axios.post('http://127.0.0.1:5000/SubmitGood', {
            'userId': this.$store.state.userID,
            'goodName': values.goodName,
            'goodType': values.goodType,
            'goodPrice': values.goodPrice,
            'goodDescription': values.goodDescription,
          }).then((response) =>{
            console.log(response)
            this.$notification['success']({
              message: '上传成功',
              description: '已将商品' + that.goodName + '上传'
            })
          }).catch((e) => {
            console.log(e)
            this.$notification['error']({
              message: '上传失败',
              description: '未找到用户ID！'
            })
          })
        }
      });
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

</style>