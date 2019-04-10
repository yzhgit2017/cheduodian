// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/common.css'
import '@/assets/js/rem.js'
import store from './store'
import {fetchPost,fetchGet} from './util/http'

Vue.config.productionTip = false

Vue.prototype.$fetchPost = fetchPost
Vue.prototype.$fetchGet = fetchGet

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
