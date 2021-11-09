<template>
  <div id="information">
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="margin_card">
        <a-col :span="12">
          <a-card title="用户名" :bordered="false">
            <p>{{userName}}</p>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="ID" :bordered="false">
            <p>{{userId}}</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="margin_card">
        <a-col :span="12">
          <a-card title="性别" :bordered="false">
            <p style="display: inline-block">{{gender}}</p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                修改 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="changeGender('0')">男</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeGender('1')">女</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>

          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="校区" :bordered="false">
            <p style="display: inline-block">{{district}}</p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                修改 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="changeDistrict('0')">学院路校区</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeDistrict('1')">沙河校区</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div style="background-color: #ececec; padding: 20px;">
      <a-row :gutter="margin_card">
        <a-col :span="12">
          <a-card title="年级" :bordered="false">
            <p style="display: inline-block">{{grade}}</p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                修改 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="changeGrade('0')">本科生</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeGrade('1')">硕士生</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeGrade('2')">博士生</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="电话" :bordered="false">
<!--            <p style="display: inline-block">{{tel}}</p>-->
<!--            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
            <div class="editable-cell" style="display: inline-block">
              <div v-if="editable" class="editable-cell-input-wrapper">
<!--                if add :value=tel-->
                <a-input @change="handleChange" @pressEnter="check"/>
                <a-icon
                  type="check"
                  class="editable-cell-icon-check"
                  @click="check"
              />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ tel }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a-icon type="edit" class="editable-cell-icon" @click="edit" />
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      userName: '',
      userId: this.$store.state.userID + 10000,
      gender: '',
      tel: '',
      district: '',
      grade: '',
      margin_card: 50,
      editable: false,
      tel_temp: ''
    }
  },
  methods: {
    changeGender(genderIndex){
      let that = this
      this.$axios.post('http://127.0.0.1:5000/QueryInfoChangeGender', {
        'userId': that.$store.state.userID,
        'gender': genderIndex
      }).then((response) => {
        console.log(response.data)
        that.gender = (response.data.gender === '0') ? '男' : '女'
        this.$notification['success']({
          message: '修改成功！'
        })
      })
    },
    changeDistrict(districtIndex) {
      let that = this
      this.$axios.post('http://127.0.0.1:5000/QueryInfoChangeDistrict', {
        'userId': that.$store.state.userID,
        'district': districtIndex
      }).then((response) => {
        console.log(response.data)
        that.district = (response.data.district === '0') ? '学院路校区' : '沙河校区'
        this.$notification['success']({
          message: '修改成功！'
        })
      })
    },
    changeGrade(gradeIndex) {
      let that = this
      this.$axios.post('http://127.0.0.1:5000/QueryInfoChangeGrade', {
        'userId': that.$store.state.userID,
        'grade': gradeIndex
      }).then((response) => {
        console.log(response.data)
        that.grade = (response.data.grade === '0') ? '本科生' : (response.data.grade === '1') ? '硕士生' : '博士生'
        this.$notification['success']({
          message: '修改成功！'
        })
      })
    },
    handleChange(e) {
      let tel = e.target.value;
      this.tel_temp = tel
    },
    check() {
      this.editable = false;
      // this.$emit('change', this.value);
      let that = this
      this.$axios.post('http://127.0.0.1:5000/QueryInfoChangeTel', {
        'userId': that.$store.state.userID,
        'tel': that.tel_temp
      }).then((response) => {
        console.log(response.data)
        that.tel = response.data.tel
        this.$notification['success']({
          message: '修改成功！'
        })
      }).catch((e) => {
        console.log(e)
        this.$notification['error']({
          message: '修改失败！',
          description: '请检查电话的格式！'
        })
      })
    },
    edit() {
      this.editable = true;
    },
  },
  created() {
    let that = this
    this.$axios.post('http://127.0.0.1:5000/QueryInfo', {
      'userId': that.$store.state.userID
    }).then((response) => {
      console.log(response.data)
      console.log(response.data.userName)
      that.userName = response.data.userName
      that.gender = (response.data.gender === '0') ? '男' : '女'
      that.district = (response.data.district === '0') ? '学院路校区' : '沙河校区'
      that.tel = response.data.tel
      that.grade = (response.data.grade === '0') ? '本科生' : (response.data.grade === '1') ? '硕士生' : '博士生'
    })
  }
}
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}
</style>