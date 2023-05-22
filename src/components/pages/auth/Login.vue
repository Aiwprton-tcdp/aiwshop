<template>
<div class="w-54">
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Имя
    </label>
    <input v-model="name" type="email" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Иванов Иван" required>
  </div>
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Пароль
    </label>
    <input v-model="password" type="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
  </div>
</div>

<button @click="tryToLogin()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Авторизоваться
</button>
</template>

<script>
import { inject } from 'vue'
import { login } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    return {
      name: String(),
      password: String(),
      token: String(),
    }
  },
  methods: {
    tryToLogin() {
      if (this.name == '' || this.password == '') {
        this.toast('\'name\' or \'password\' is empty', 'error')
        return
      }

      this.loading = true

      login({
        login: this.name,
        password: this.password,
      }).then(r => {
        if (!r) {
          this.toast('\'name\' or \'password\' is empty', 'error')
        }

        this.password = ''
        this.loading = false
      }).catch(e => this.toast(e.message, 'error'))
    },
  }
}
</script>
