// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/common.css'
import '@/assets/js/rem.js'
import store from './store'
import {fetchPost,fetchGet} from './util/http'
import Toast from './util/toast'
import Toast1 from './util/toast1'
import singleImgZoom from './util/singleImgZoom'
import swiperImgZoom from '@/components/swiperImgZoom/swiperImgZoom'
import { loadmore, spinner } from 'mint-ui'

Vue.config.productionTip = false

Vue.prototype.$fetchPost = fetchPost
Vue.prototype.$fetchGet = fetchGet
Vue.prototype.$toast = Toast
Vue.prototype.$toast1 = Toast1
Vue.prototype.$singleImgZoom = singleImgZoom
Vue.prototype.$swiperImgZoom = swiperImgZoom
Vue.prototype.$http = 'http://cheduodian.mcbn.cn'
// Vue.prototype.$http = 'http://nw.cheduodian.com'

Vue.component(loadmore.name, loadmore)
Vue.component(spinner.name, spinner)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
