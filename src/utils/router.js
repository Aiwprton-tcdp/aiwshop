import { createRouter, createWebHistory } from 'vue-router'
import { hasToken, isAuthenticated, logout } from '@/utils/auth'

import Goods from '@/components/pages/Goods.vue'
import Login from '@/components/pages/auth/Login.vue'
import Register from '@/components/pages/auth/Register.vue'
import SendResetCode from '@/components/pages/auth/SendResetCode.vue'
import PasswordReset from '@/components/pages/auth/PasswordReset.vue'
import Profile from '@/components/pages/profile/Main.vue'
import ShoppingCart from '@/components/pages/profile/Cart.vue'
import PurchaseHistory from '@/components/pages/profile/History.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import Chats_Main from '@/components/pages/chat/Main.vue'
import ChatsList from '@/components/pages/chat/List.vue'
import ChatMessages from '@/components/pages/chat/Messages.vue'
import D_Main from '@/components/pages/dashboard/Main.vue'
import D_Users from '@/components/pages/dashboard/Users.vue'
import D_Goods from '@/components/pages/dashboard/Goods.vue'
import D_Sales from '@/components/pages/dashboard/Sales.vue'
import D_Roles from '@/components/pages/dashboard/Roles.vue'
import D_Charts from '@/components/pages/dashboard/Charts.vue'
import D_Goods_Edit from '@/components/pages/dashboard/goods/Edit.vue'
import D_Goods_Edit_Modal from '@/components/pages/dashboard/goods/modals/EditModal.vue'
import D_Edit_Goods from '@/components/pages/dashboard/modals/EditGood.vue'

// const AuthData = isAuthenticated

const routes = [
  { path: '/', name: 'main', component: Goods },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/forgot_password', name: 'send_reset_code', component: SendResetCode },
  { path: '/password_reset', name: 'password_reset', component: PasswordReset },
  {
    path: '/logout',
    name: 'logout',
    component: {
      beforeRouteEnter(to, from, next) {
        logout().then(() => {
          next({ name: 'main' })
          window.location.reload()
        })
      }
    }
  },
  {
    path: '/users/:id',
    name: 'user',
    redirect: { name: 'current_profile' }
  },
  { path: '/users', redirect: { name: 'current_profile' } },
  { path: '/profile', redirect: { name: 'current_profile' } },
  { path: '/users/profile', redirect: { name: 'current_profile' } },
  { path: '/users/current/profile', name: 'current_profile', component: Profile },
  { path: '/users/:id?/profile', name: 'profile', component: Profile },
  { path: '/users/:id?/profile/cart', name: 'cart', component: ShoppingCart },
  { path: '/users/:id?/profile/purchase_history', name: 'history', component: PurchaseHistory },
  {
    path: '/chats',
    // redirect: '/chats/list',
    name: 'chats',
    component: Chats_Main,
    redirect: { name: 'chats_list' },
    children: [
      // {
      //   path: '', name: 'chats_main', component: Chats_Main
      // },
      // { path: '', name: 'chats_main', component: Chats_List },
      { path: 'list', name: 'chats_list', component: ChatsList },
      { path: ':id', name: 'chat', component: ChatMessages },
    ]
  },
  {
    path: '/dashboard',
    // redirect: '/dashboard',
    // redirect: '/dashboard/users',
    name: 'dashboard',
    component: Dashboard,
    redirect: { name: 'dashboard_main' },
    children: [
      { path: '', name: 'dashboard_main', component: D_Main },
      { path: 'users', name: 'users', component: D_Users, },
      { path: 'goods/:id', name: 'good_edit', component: D_Goods_Edit },
      { path: 'goods', name: 'goods', component: D_Goods },
      { path: 'sales', name: 'sales', component: D_Sales },
      { path: 'roles', name: 'roles', component: D_Roles },
      { path: 'charts', name: 'charts', component: D_Charts },
    ]
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: '/',
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const ht = hasToken()
  const public_routes = ['login', 'register', 'send_reset_code', 'password_reset']
  const routes_with_main = public_routes.concat(['main'])
  // let y = AuthData.then(console.log)
  // AuthData().then(console.log)
  // console.log(AuthData.then(d => d))

  if (ht && public_routes.includes(to.name)) {
    return next({ name: 'main' })
  }
  else if (!ht && !routes_with_main.includes(to.name)) {
    return next({ name: 'main' })
  }
  // else if (!routes.map(({ name }) => name).includes(to.name)) {
  //   return next({ name: 'main' }) // 404
  // } // доработать для children

  next()
})

export default router
