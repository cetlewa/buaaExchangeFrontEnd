<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo"></div>
        <a-menu theme="dark" mode="inline" :default-selected-keys="selectKeys">
          <a-menu-item key="3">
            <a-icon type="gift" />
            <span>主页</span>
            <router-link to="/DefaultPage"></router-link>
          </a-menu-item>
<!--          <a-menu-item v-show="this.$store.state.logged === true" key="4">-->
<!--            <a-icon type="user" />-->
<!--            <span>注册成功</span>-->
<!--            <router-link to="/RegisterSuccess"></router-link>-->
<!--          </a-menu-item>-->
          <a-menu-item key="5">
            <a-icon type="appstore" />
            <span>浏览</span>
            <router-link to="/Schedule"></router-link>
          </a-menu-item>
          <a-menu-item v-show="this.$store.state.logged === true" key="6">
            <a-icon type="shop" />
            <span>我的商品</span>
            <router-link to="/MyGoods"></router-link>
          </a-menu-item>
          <a-menu-item v-show="this.$store.state.logged === true" key="7">
            <a-icon type="shop" />
            <span>我的订单</span>
            <router-link to="/SelectLesson"></router-link>
          </a-menu-item>
          <a-menu-item v-show="this.$store.state.logged === true" key="8">
            <a-icon type="message" />
            <span>我的私信</span>
            <router-link to="/MyMessages"></router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
          />
          <span id="components-layout-demo-custom-welcome" style="font-weight: bolder;font-size: x-large">
            航·易-BUAA EXCHANGE
          </span>

          <span id="self-information-logout" v-show="this.$store.state.logged === false">
            <a-button type="" style="margin: 10px" @click="login">登录</a-button>
            <a-button type="" style="margin: 10px" @click="register">注册</a-button>
            <a-avatar icon="user" style="margin-left: 10px;font-size: large;border-radius: 50%;background-color: gainsboro"/>
          </span>

          <span id="self-information-login" v-show="this.$store.state.logged === true">
<!--            <a-button type="danger" style="margin: 10px" icon="poweroff" @click="logout">注销</a-button>-->
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" >
                <a-avatar icon="user" style="margin-left: 10px;font-size: large;border-radius: 50%;background-color: #87d068"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="checkInfo"><a-icon type="user" />&nbsp;&nbsp;个人信息</a>
                </a-menu-item>
<!--                <a-menu-item>-->
<!--                  <a @click="checkMessages"><a-icon type="message" />&nbsp;&nbsp;私信</a>-->
<!--                </a-menu-item>-->
                <a-menu-item>
                  <a @click="logout"><a-icon type="poweroff" />&nbsp;&nbsp;注销</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
<!--            <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" style="margin-left: 10px;-->
<!--            font-size: large;border-radius: 50%;background-color: gainsboro;"/>-->
          </span>

        </a-layout-header>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >


          <router-view></router-view>


        </a-layout-content>
        <a-layout-footer>
          <div id="components-layout-demo-custom-footer">
            Dua Design ©2021 Created by Dua Company
          </div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      selectKeys: "[]"
    };
  },
  created() {
    if (window.sessionStorage.getItem("list") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(window.sessionStorage.getItem("list"))))
      console.log(window.sessionStorage.getItem("list"))
      this.$router.push(this.$store.state.currentWeb)
    }

    window.addEventListener("beforeunload",()=>{
      window.sessionStorage.setItem("list",JSON.stringify(this.$store.state))
    })
  },
  methods:{
    logout() {
      this.$store.state.logged = false
      this.$store.state.userID = ""
      this.selectKeys = "[]"
      this.$router.push('/DefaultPage')
    },
    login() {
      this.$router.push('/Login')
    },
    register() {
      this.$router.push('/Register')
    },
    checkInfo() {
      this.$router.push('/Information')
    },
  }

};
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}

#components-layout-demo-custom-trigger #components-layout-demo-custom-welcome {
  margin: auto;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);;
  text-align: center;
}

#components-layout-demo-custom-trigger #components-layout-demo-custom-footer {
  text-align: center;
  margin-top: auto;
}

#self-information-logout, #self-information-login {
  float: right;
  margin-right: 2%;
}

#log-out {
  float: right;
  margin-right: 2%;
}
</style>