<template>

  <div id="log-in">
    <div style="text-align: center">
      <img src="@/assets/AUBB.png" id="AUBB-logo">
    </div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="用户名">
        <a-input
            v-decorator="[
          'userName',
          {
            rules: [
              {
                pattern: '^[0-9]{8}$',
                message: '请输入正确格式的用户名！',
              },
              {
                required: true,
                message: '请输入你的用户名！',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
        <a-input
            v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码！',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
            type="password"
        />
      </a-form-item>
      <!--    <a-form-item v-bind="tailFormItemLayout">-->
      <!--      <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">-->
      <!--        I have read the-->
      <!--        <a href="">-->
      <!--          agreement-->
      <!--        </a>-->
      <!--      </a-checkbox>-->
      <!--    </a-form-item>-->
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" @click="login">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
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
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    login() {
      this.$store.state.logged = true;
    }
  },
};
</script>

<style scoped>
#AUBB-logo {  width: 60%;
  margin-top: 60px;
  margin-bottom: 80px;

}
</style>