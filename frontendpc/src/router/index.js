import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'
import TakeOut from '../components/TakeOut.vue'
import ManageOrders from '../components/ManageOrders.vue'
import SalesAnalysis from '../components/SalesAnalysis.vue'
import FoodAnalysis from '../components/FoodAnalysis.vue'
import EditFood from '../components/EditFood.vue'
import AddFood from '../components/AddFood.vue'
import OrdersRecord from '../components/OrdersRecord.vue'
import Opinion from '../components/Opinion.vue'
import HangUp from '../components/HangUp.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/CanteenPC/login', component: Login },
  {
    path: '/CanteenPC/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/CanteenPC/welcome', component: Welcome },
      { path: '/CanteenPC/manageOrders', component: ManageOrders },
      { path: '/CanteenPC/takeOut', component: TakeOut },
      { path: '/CanteenPC/salesAnalysis', component: SalesAnalysis },
      { path: '/CanteenPC/foodAnalysis', component: FoodAnalysis },
      { path: '/CanteenPC/editFood', component: EditFood },
      { path: '/CanteenPC/addFood', component: AddFood },
      { path: '/CanteenPC/ordersRecord', component: OrdersRecord },
      { path: '/CanteenPC/opinion', component: Opinion },
      { path: '/CanteenPC/hangUp', component: HangUp }
    ]
  }
]

const router = new VueRouter({
  routes
})

/* TODO

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
// to :: 将要访问的路径
// from :: 代表从哪个路径跳转而来
// next :: 是一个表示放行的函数
if (to.path === '/login') return next()
// 获取 token
const tokenStr = window.sessionStorage.getItem('token')
if (!tokenStr) return next('/login')
next()
})

*/

export default router
