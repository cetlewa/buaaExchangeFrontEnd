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
  },
  {
    path: '/Information',
    component: require('./components/Information').default
  },
  {
    path: '/MyMessages',
    component: require('./components/MyMessages').default
  },
  {
    path: '/RegisterSuccess',
    component: require('./components/RegisterSuccess').default
  },
  {
    path: '/Test',
    component: require('./components/Test').default
  },
  {
    path: '/DefaultPage',
    component: require('./components/DefaultPage').default
  },
  {
    path: '/MyGoods',
    component: require('./components/MyGoods').default
  },
  {
    path: '/UploadGoods',
    component: require('./components/UploadGoods').default
  },
  {
    path: '/CheckGood',
    component: require('./components/CheckGood').default
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
    userID: '',
    currentWeb: '',
    goodId: '',
    ip: 'http://127.0.0.1:5000/',
  }
})



new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')

