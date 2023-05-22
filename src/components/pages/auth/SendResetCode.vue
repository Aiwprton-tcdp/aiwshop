<template>
<div class="flex w-54">
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Email
  </label>
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Telegram
  </label>
</div>

<div class="w-54">
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Email
    </label>
    <input v-model="email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required>
  </div>
  <a href="http://t.me/aiwshop_infobot" target="_blank" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    http://t.me/aiwshop_infobot
  </a>
</div>
  
<button @click="GetToken()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Прислать код
</button>
<RouterLink :to="{ name: 'password_reset' }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
  Сменить пароль
</RouterLink>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'SendResetCode',
  data() {
    return {
      email: String(),
      token: String(),
    }
  },
  setup() {
    const toast = inject('createToast')

    return {
      toast,
    }
  },
  methods: {
    GetToken() {
      if (this.email == '') {
        this.toast('\'email\' is empty', 'error')
        return
      }

      this.ax.post('forgot-password', {
        social: this.email,
      }).then(r => {
        console.log(r)
        this.token = r
        this.$router.push({ name: 'password_reset' })
      }).catch(e => this.toast(e.message, 'error'))
    },
  }
}
</script>
