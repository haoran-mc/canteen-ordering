import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'
import TakeOut from '../components/TakeOut.vue'
import ManageOrders from '../components/ManageOrders.vue'
import HangUp from '../components/HangUp.vue'
import SalesAnalysis from '../components/SalesAnalysis.vue'
import FoodAnalysis from '../components/FoodAnalysis.vue'
import EditFood from '../components/EditFood.vue'
import AddFood from '../components/AddFood.vue'
import OrdersRecord from '../components/OrdersRecord.vue'
import Opinion from '../components/Opinion.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/manageOrders', component: ManageOrders },
      { path: '/takeOut', component: TakeOut },
      { path: '/hangUp', component: HangUp },
      { path: '/salesAnalysis', component: SalesAnalysis },
      { path: '/foodAnalysis', component: FoodAnalysis },
      { path: '/editFood', component: EditFood },
      { path: '/addFood', component: AddFood },
      { path: '/ordersRecord', component: OrdersRecord },
      { path: '/opinion', component: Opinion }
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
