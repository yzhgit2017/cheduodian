import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/homePage'
import personalPage from '@/pages/personalPage'
import findVehicle from '@/pages/findVehicle'
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
import choiceColor from '@/pages/choiceColor'
import vehicleDetails from '@/pages/vehicleDetails'
import publishVehicle from '@/pages/publishVehicle'
import uploadImg from '@/pages/uploadImg'

Vue.use(Router)

Router.prototype.goBack = function () { 
　　this.isBack = true
　　this.back()
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/personalPage',
      name: 'personalPage',
      component: personalPage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/findVehicle/:from',
      name: 'findVehicle',
      component: findVehicle,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/vehicleType',
      name: 'vehicleType',
      component: vehicleType,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/choiceBrand',
      name: 'choiceBrand',
      component: choiceBrand,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/choiceCity',
      name: 'choiceCity',
      component: choiceCity,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/coty',
      name: 'coty',
      component: coty,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/filterPrice',
      name: 'filterPrice',
      component: filterPrice,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/filter',
      name: 'filter',
      component: filter,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/choiceMarket',
      name: 'choiceMarket',
      component: choiceMarket,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/filterMileage',
      name: 'filterMileage',
      component: filterMileage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/biansuxiang',
      name: 'biansuxiang',
      component: biansuxiang,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/displacement',
      name: 'displacement',
      component: displacement,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/choiceColor',
      name: 'choiceColor',
      component: choiceColor,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/vehicleDetails/:id',
      name: 'vehicleDetails',
      component: vehicleDetails,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/publishVehicle',
      name: 'publishVehicle',
      component: publishVehicle,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: uploadImg,
      meta: {
        keepAlive: false
      }
    },
  ]
})
