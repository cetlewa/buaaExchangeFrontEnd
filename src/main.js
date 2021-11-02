import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import VueRouter from "vue-router";
import Vuex from 'vuex'
import axios from 'axios'

import 'ant-design-vue/dist/antd.css';
import './assets/css/all.css'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios

Vue.use(Antd);
Vue.use(Vuex)
Vue.use(VueRouter)

const Routers = [
  {
    path: '/Login',
    component: require('./components/Login.vue').default
  },
  {
    path: '/Register',
    component: require('./components/Register').default
  },
  {
    path: '/RelevantRule',
    component: require('./components/RelevantRule').default
  }
]

const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig)

const store = new Vuex.Store({
  state: {
    logged: true,
    stuId: '',
    currentWeb: ''
  }
})



new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')

