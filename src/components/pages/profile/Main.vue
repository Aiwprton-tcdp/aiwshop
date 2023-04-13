<style scoped></style>

<template>
<div class="grid grid-cols-2 gap-x-40 gap-y-28">
  <div class="flex flex-col gap-4 items-center">
    <img class="w-28 h-28 rounded-full" src="@/assets/icons8-male-user-50.png" alt="">
    <p class="font-medium text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white">
      {{ user.name }}
    </p>
    <p class="text-xs font-medium text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white">
      Дата регистрации: <code>{{ FormatDate(user.created_at) }}</code>
    </p>
  </div>

  <div class="flex flex-col items-center">
    <div class="flex flex-row gap-4 items-center">
      <label>
        <RouterLink :to="{ name: 'cart' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Корзина
        </RouterLink>
      </label>
      <label>
        <RouterLink :to="{ name: 'history', params: { id: user?.id ?? 0 } }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          История покупок
        </RouterLink>
      </label>
      <label>
        <RouterLink :to="{ name: 'send_reset_code' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Смена пароля
        </RouterLink>
      </label>
      <!-- <button @click="SendMail()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Send Mail
      </button> -->
    </div>
  </div>
    
  <div class="flex flex-row gap-4 items-center">
    <div v-for="s in socials">
      <p>{{ s.social.name }}</p>
    </div>
  </div>
</div>
</template>

<script>
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { DefaultDate } from '@/utils/DateFormatter.js'

export default {
  name: 'Profile_Main',
  components: {
    RouterLink,
  },
  data() {
    return {
      user: Object(),
      cart: Array(),
      socials: Array(),
    }
  },
  setup() {
    const UserData = inject('UserData')

    return {
      UserData,
    }
  },
  mounted() {
    this.GetUserData()
    // this.GetCart()
    // this.GetSocials()
  },
  methods: {
    GetUserData() {
      console.log(this.$route.params)
      console.log(this.UserData)
      this.ax.get(`${this.$route.params.id ?? this.UserData.id}/profile`).then(r => {
        let p = r.data.data
        console.log(p)
        this.user = p
        // this.UserData = this.user
        // this.socials = p.social_data
      }).catch(e => {
        console.log(e)
        this.errored = true
      })
    },
    GetCart() {
      this.ax.get(`profile/cart`).then(r => {
        let p = r.data.data
        console.log(p)
        this.cart = p
      }).catch(e => {
        console.log(e)
        this.errored = true
      })
    },
    GetSocials() {
      this.ax.get(`profile/socials`).then(r => {
        let p = r.data.data
        console.log(p)
        this.socials = p
      }).catch(e => {
        console.log(e)
        this.errored = true
      })
    },
    SendMail() {
      this.ax.get('send-mail').then(r => {
        console.log(r)
      }).catch(e => {
        console.log(e)
        this.errored = true
      })
    },
    FormatDate(date) {
      return DefaultDate(date)
    },
  },
}
</script>
