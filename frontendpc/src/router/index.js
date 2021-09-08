import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home
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
