<template>
<div class="w-54">
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Имя
    </label>
    <input v-model="name" type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Иванов Иван" required>
  </div>
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      social
    </label>
    <input v-model="social" type="text" id="social" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="example@gmail.com" required>
  </div>
  <div class="mb-6 flex items-center space-x-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Пароль
    </label>
    <input v-model="password" type="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
  </div>
  <div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input v-model="check_agreement" id="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
    </div>
    <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
</div>
<button @click="TryToRegister()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Register
</button>
</template>

<script>
import { inject } from 'vue'
import { register } from '@/utils/auth'


export default {
  name: 'Register',
  data() {
    return {
      name: String(),
      social: String(),
      password: String(),
      check_agreement: Boolean(),
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
    TryToRegister() {
      if (this.name == ''
        || this.social == ''
        || this.password == ''
        || !this.check_agreement) {
        this.toast('validation required', 'error')
        return
      }

      this.loading = true

      register({
        name: this.name,
        social: this.social,
        password: this.password,
      }).then(r => {
        if (!r) {
          this.toast('some data is incorrect', 'error')
        }

        this.password = ''
        this.loading = false
      }).catch(e => console.log(e))
    },
  }
}
</script>
