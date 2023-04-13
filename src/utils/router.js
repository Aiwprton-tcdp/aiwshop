import { createRouter, createWebHistory } from 'vue-router'
import { hasToken, logout } from '@/utils/auth'
import Goods from '@/components/pages/Goods.vue'
import Login from '@/components/pages/auth/Login.vue'
import Register from '@/components/pages/auth/Register.vue'
import SendResetCode from '@/components/pages/auth/SendResetCode.vue'
import PasswordReset from '@/components/pages/auth/PasswordReset.vue'
import Profile from '@/components/pages/profile/Main.vue'
import ShoppingCart from '@/components/pages/profile/Cart.vue'
import PurchaseHistory from '@/components/pages/profile/History.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import D_Main from '@/components/pages/dashboard/Main.vue'
import D_Users from '@/components/pages/dashboard/Users.vue'
import D_Goods from '@/components/pages/dashboard/Goods.vue'
import D_Sales from '@/components/pages/dashboard/Sales.vue'
import D_Roles from '@/components/pages/dashboard/Roles.vue'
import D_Goods_Edit from '@/components/pages/dashboard/goods/Edit.vue'
import D_Goods_Edit_Modal from '@/components/pages/dashboard/goods/modals/EditModal.vue'
import D_Edit_Goods from '@/components/pages/dashboard/modals/EditGood.vue'

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
        logout() ? next({ name: 'login' }) : next({ name: 'main' })
        window.location.reload()
      }
    }
  },
  {
    path: '/users/:id',
    redirect: { name: 'current_profile' },
    name: 'user',
    // children: [
    //   { path: 'profile', name: 'profile', component: Profile },
    // ]
  },
  { path: '/users', redirect: { name: 'current_profile' } },
  { path: '/profile', redirect: { name: 'current_profile' } },
  { path: '/users/profile', redirect: { name: 'current_profile' } },
  { path: '/users/current/profile', name: 'current_profile', component: Profile },
  { path: '/users/:id?/profile', name: 'profile', component: Profile },
  { path: '/users/:id?/profile/cart', name: 'cart', component: ShoppingCart },
  { path: '/users/:id?/profile/purchase_history', name: 'history', component: PurchaseHistory },
  {
    path: '/dashboard',
    redirect: '/dashboard',
    // redirect: '/dashboard/users',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'dashboard_main',
        component: D_Main,
      },
      {
        path: 'users',
        name: 'users',
        component: D_Users,
      },
      {
        path: 'goods/:id',
        name: 'good_edit',
        component: D_Goods_Edit,
      },
      {
        path: 'goods',
        name: 'goods',
        component: D_Goods,
        children: [
          // {
          //   path: ':id',
          //   name: 'good_edit_modal',
          //   component: D_Goods_Edit_Modal,
          //   props: true
          // },
          // {
          //   path: ':id',
          //   // name: { default: 'good_edit', in_page: 'good_edit_modal' },
          //   components: { good_edit: D_Goods_Edit, good_edit_modal: D_Goods_Edit_Modal },
          //   props: { good_edit: false, good_edit_modal: true }
          // },
          // {
          //   path: ':id',
          //   name: 'good_edit',
          //   components: D_Goods_Edit,
          // },
          // {
          //   path: ':id',
          //   name: 'good_edit_modal',
          //   components: D_Goods_Edit_Modal,
          //   props: true
          // },
          // {
          //   path: '/new',
          //   component: D_Goods
          // },
          // {
          //   path: '/:id',
          //   name: 'edit_good',
          //   component: EditGood,
          // },
        ]
      },
      {
        path: 'sales',
        name: 'sales',
        component: D_Sales,
      },
      {
        path: 'roles',
        name: 'roles',
        component: D_Roles,
      },
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

  if (ht && ['login', 'register', 'send_reset_code', 'password_reset'].includes(to.name)) {
    return next({ name: 'main' })
  }
  else if (!ht && !['login', 'register', 'main', 'send_reset_code', 'password_reset'].includes(to.name)) {
    return next({ name: 'main' })
  }
  // else if (!routes.map(({ name }) => name).includes(to.name)) {
  //   return next({ name: 'main' }) // 404
  // } // доработать для children

  next()
})

export default router;
