<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="用户名" has-feedback>
        <a-input
            v-decorator="[
          'userName',
          {
            rules: [
              {
                pattern: '^[0-9]{8}$',
                message: '输入不合规范！请输入8位数字！',
              },
              {
                required: true,
                message: '请输入学号！',
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
                message: '请输入密码!',
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
      <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
            v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认密码！',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
            type="password"
            @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="性别">
        <a-radio-group
            v-decorator="[
          'gender',
          {
            rules: [
                {
                  required: true,
                  message: '请勾选性别！'
                },
              ]
          }
        ]">
          <a-radio :value='0'>
            男
          </a-radio>
          <a-radio :value='1'>
            女
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="年级" has-feedback>
        <a-select default-value="1" v-decorator="[
          'grade',
          {
            rules: [
                {
                  required: true,
                  message: '请选择年级！'
                },
              ]
          }
        ]">
          <a-select-option value="1">
            本科生
          </a-select-option>
          <a-select-option value="2">
            硕士生
          </a-select-option>
          <a-select-option value="3">
            博士生
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="电话号码" has-feedback>
        <a-input
            v-decorator="[
          'tel',
          {
            rules: [
                {
                  required: true,
                  message: '请输入电话!'
                },
                {
                  pattern: '^[0-9]{11}$',
                  message: '输入不合规范！请输入11位数字！',
                }
            ],
          },
        ]"
            style="width: 100%"
        >
          <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="1">
              +1
            </a-select-option>
            <a-select-option value="4">
              +44
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="校区">
        <a-radio-group
            v-decorator="[
          'district',
          {
            rules: [
                {
                  required: true,
                  message: '请勾选校区！'
                },
              ]
          }
        ]">
          <a-radio :value='0'>
            学院路校区
          </a-radio>
          <a-radio :value='1'>
            沙河校区
          </a-radio>
        </a-radio-group>
      </a-form-item>
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
          注册
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
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$axios.post('http://127.0.0.1:5000/Register', {
            'userName': values.userName,
            'password': values.password,
            'gender': values.gender,
            'grade': values.grade,
            'district': values.district,
            'tel': values.tel
          }).then((response) =>{
            console.log(response)
            this.$notification['success']({
              message: '注册成功',
              description: ''
            })
            this.$router.push('RegisterSuccess')
          }).catch((e) => {
            console.log(e)
            this.$notification['error']({
              message: '注册失败',
              description: '学号重复！'
            })
          })
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
        callback('两次密码不一致!');
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
  },
};
</script>

<style scoped>

</style>