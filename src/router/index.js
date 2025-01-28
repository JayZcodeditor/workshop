import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/adminToolbar',
    name: 'AdminPath',
    component: () => import('../views/Toolbar.vue'),
      children:[
        {
          path: '/me',
          name: 'meProfile',
          component: () => import('../views/Me.vue')
        },
        {
          path: '/grade',
          name: 'gradeCalculate',
          component: () => import('../views/GradeCalculate.vue')
        },
        {
          path: '/home',
          name: 'dashboardAdmin',
          component: () => import('../views/admin/AdminDashboard.vue')
        },
        {
          path: '/admin/user',
          name: 'userManage',
          component: () => import('../views/admin/UserView.vue')
        },
        {
          path: '/admin/market',
          name: 'marketManage',
          component: () => import('../views/admin/ProductView.vue')
        },
      ]
  },
  {
    path: '/userToolbar',
    name: 'UserPath',
    component: () => import('../views/Toolbar.vue'),
    children:[
      {
        path: '/user/homepage',
        name: 'homePage',
        component: () => import('../views/user/Homepageuser.vue')
      },
      {
        path: '/user/market',
        name: 'shopPage',
        component: () => import('../views/user/MarketView.vue')
      },
      {
        path: '/user/order',
        name: 'orderPage',
        component: () => import('../views/user/OrderView.vue')
      },
    ]
  },
  // Catch-all route for undefined paths
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
