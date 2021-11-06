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
            <p>card content</p>
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
                  <a @click="changeGender('男')">男</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeGender('女')">女</a>
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
                  <a @click="changeDistrict('学院路校区')">学院路校区</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeDistrict('沙河校区')">沙河校区</a>
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
                  <a @click="changeGrade('本科生')">本科生</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeGrade('硕士生')">硕士生</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="changeGrade('博士生')">博士生</a>
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
      userName: 'buaaboy',
      gender: '男',
      tel: '123',
      district: '学院路校区',
      grade: '本科生',
      margin_card: 50,
      editable: false
    }
  },
  methods: {
    changeGender(genderIndex){
      this.gender = genderIndex
    },
    changeDistrict(districtIndex) {
      this.district = districtIndex
    },
    changeGrade(gradeIndex) {
      this.grade = gradeIndex
    },
    handleChange(e) {
      let tel = e.target.value;
      this.tel = tel;
    },
    check() {
      this.editable = false;
      // this.$emit('change', this.value);
    },
    edit() {
      this.editable = true;
    },
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