<template>
<div class="w-max">
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Код
    </label>
    <input v-model="token" type="text" id="token" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="123456" required>
  </div>
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Новый пароль
    </label>
    <input v-model="new_password" type="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
  </div>
</div>

<button @click="GetToken()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Сменить пароль
</button>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'PasswordReset',
  data() {
    return {
      new_password: String(),
      token: String(),
    }
  },
  setup() {
    const loading = inject('loading')
    const toast = inject('createToast')

    return {
      loading,
      toast,
    }
  },
  methods: {
    GetToken() {
      if (this.email == '') {
        this.toast('\'email\' is empty', 'error')
        return
      }

      this.ax.post('password-reset', {
        token: this.token,
        password: this.new_password,
      }).then(r => {
        console.log(r.data.data)
      }).catch(e => this.toast(e.message, 'error'))
    },
  }
}
</script>
