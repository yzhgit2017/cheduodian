import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/homePage'
import personalPage from '@/pages/personalPage'
import findVehicle from '@/pages/findVehicle'
import test from '@/pages/test'
import vehicleType from '@/pages/vehicleType'
import index from '@/pages/index'
import login from '@/pages/login'
import choiceBrand from '@/pages/choiceBrand'
import choiceCity from '@/pages/choiceCity'
import coty from '@/pages/coty'
import filterPrice from '@/pages/filterPrice'
import filter from '@/pages/filter'
import choiceMarket from '@/pages/choiceMarket'
import filterMileage from '@/pages/filterMileage'
import biansuxiang from '@/pages/biansuxiang'
import displacement from '@/pages/displacement'

Vue.use(Router)

Router.prototype.goBack = function () { 
　　this.isBack = true
　　window.history.go(-1)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/homePage',
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
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/vehicleType',
      name: 'vehicleType',
      component: vehicleType
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/choiceBrand',
      name: 'choiceBrand',
      component: choiceBrand
    },
    {
      path: '/choiceCity',
      name: 'choiceCity',
      component: choiceCity
    },
    {
      path: '/coty',
      name: 'coty',
      component: coty
    },
    {
      path: '/filterPrice',
      name: 'filterPrice',
      component: filterPrice
    },
    {
      path: '/filter',
      name: 'filter',
      component: filter
    },
    {
      path: '/choiceMarket',
      name: 'choiceMarket',
      component: choiceMarket
    },
    {
      path: '/filterMileage',
      name: 'filterMileage',
      component: filterMileage
    },
    {
      path: '/biansuxiang',
      name: 'biansuxiang',
      component: biansuxiang
    },
    {
      path: '/displacement',
      name: 'displacement',
      component: displacement
    },
  ]
})
