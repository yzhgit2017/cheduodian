// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/common.css'
import '@/assets/js/rem.js'
import store from './store'
import {fetchPost,fetchGet} from './util/http'
import myToast from '@/components/myToast/myToast'
import Toast from '@/components/toast/toast'
import singleImgZoom from '@/components/singleImgZoom/singleImgZoom'
import swiperImgZoom from '@/components/swiperImgZoom/swiperImgZoom'
import { loadmore, spinner, picker } from 'mint-ui'

Vue.config.productionTip = false

Vue.prototype.$fetchPost = fetchPost
Vue.prototype.$fetchGet = fetchGet
Vue.prototype.$myToast = myToast
Vue.prototype.$toast = Toast
Vue.prototype.$singleImgZoom = singleImgZoom
Vue.prototype.$swiperImgZoom = swiperImgZoom
Vue.prototype.$http = 'http://cheduodian.mcbn.cn'
// Vue.prototype.$http = 'http://nw.cheduodian.com'

Vue.component(loadmore.name, loadmore)
Vue.component(spinner.name, spinner)
Vue.component(picker.name, picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
