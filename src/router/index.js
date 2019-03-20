import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/homePage'
import personalPage from '@/pages/personalPage'
import findVehicle from '@/pages/findVehicle'

Vue.use(Router)

Router.prototype.goBack = function () { 
　　this.isBack = true
　　window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/personalPage',
      name: 'personalPage',
      component: personalPage
    },
    {
      path: '/findVehicle',
      name: 'findVehicle',
      component: findVehicle
    },
  ]
})
