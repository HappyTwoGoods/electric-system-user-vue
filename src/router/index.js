import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Pay from '@/page/Pay'
import UseElectric from '@/page/UseElectric'
import UserInfo from '@/page/UserInfo'
import Register from '@/page/Register'
import Login from '@/page/Login'
import Reader from '@/components/Reader'
import CopyRecord from '@/page/CopyRecord'
import ReaderInfo from '@/page/ReaderInfo'
import UserHome from '@/page/UserHome'
import BandElectric from '@/page/BandElectric'
import AddCopy from '@/page/AddCopy'

Vue.use(Router)

Router.prototype.togo = function (path) {
  this.isleft = true;
  this.isright = false;
  this.push(path)
};
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true;
  this.isleft = false;
  this.push(path)
};
Router.prototype.goLeft = function (path, query) {
  this.isright = false;
  this.isleft = true;
  this.push(path, query)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true;
  this.isleft = false;
  this.go(-1)
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // {
    //   path: "/Login",
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: "/Register",
      name: 'Register',
      component: Register
    },
    {
      path: "/Reader",
      name: 'Reader',
      component: Reader
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      redirect: 'UserHome',
      children: [
        {
          path: '/UseElectric',
          name: 'UseElectric',
          component: UseElectric
        },
        {
          path: "/Pay",
          name: 'Pay',
          component: Pay
        },
        {
          path: "/UserInfo",
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: "/UserHome",
          name: 'UserInfo',
          component: UserHome
        },
        {
          path: "/BandElectric",
          name: 'BandElectric',
          component: BandElectric
        }
      ]
    },
    {
      path: '/Reader',
      name: 'Reader',
      component: Reader,
      redirect: '/Login',
      children: [
        {
          path: '/AddCopy',
          name: 'AddCopy',
          component: AddCopy
        },
        {
          path: '/CopyRecord',
          name: 'CopyRecord',
          component: CopyRecord
        },
        {
          path: "/ReaderInfo",
          name: 'ReaderInfo',
          component: ReaderInfo
        }
      ]
    },
  ]
})
