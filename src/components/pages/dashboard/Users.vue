<style scoped></style>

<template>
<div class="flex text-sm sm:text-base">
  <Navigation ref="nav" />
  
  <div class="flex items-center">
    <a href="" class="flex text-white hover:text-gray-100 bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
      <span class="font-bold">&#10010;&nbsp;&nbsp;</span>Пользователь
    </a>
  </div>
</div>

<div class="relative overflow-x-auto space-y-4">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Id</th>
        <th scope="col" class="px-6 py-3">Имя</th>
        <th scope="col" class="px-6 py-3">Роль</th>
        <th scope="col" class="px-6 py-3">Дата регистрации</th>
        <th scope="col" class="px-6 py-3">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
          <button @click="ShowEdit(u)">&#x270E;</button>
          {{ u.id }}
        </td>
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ u.name }}
        </td>
        <td class="px-6 py-4">{{ u.rolename }}</td>
        <td class="px-6 py-4">{{ u.created_at }}</td>
        <td class="px-6 py-4">
          <button @click="LoginToAnother(u.id)" class="text-blue-500">Авторизоваться</button>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination ref="PaginationTemplate" @invoke="GetUsers" />
</div>
</template>

<script>
import { inject } from 'vue'
import { login_to_another } from '@/utils/auth'
import Navigation from '@/components/pages/dashboard/templates/Navigation.vue'
import Pagination from '@/components/templates/Pagination.vue'

export default {
  name: 'D_Users',
  components: { Navigation, Pagination },
  data() {
    return {
      users: Array(),
    }
  },
  setup() {
    const loading = inject('loading')
    const toast = inject('createToast')

    return { loading, toast }
  },
  mounted() {
    this.$refs.nav.data = ['Пользователи']
    this.GetUsers()
  },
  methods: {
    GetUsers(page = 1, per_page_internal = 10) {
      this.loading = true

      this.ax.get(`users?page=${page}&limit=${per_page_internal}`)
        .then(r => {
          let p = r.data.data
          this.users = p.data
          this.PreparePagination(p)
        }).catch(e => {
          this.toast(e.response.data.message, 'error')
        }).finally(() => this.loading = false)
    },
    LoginToAnother(id) {
      login_to_another({ id: id }).then(r => {
        console.log(r)
        this.errored = !r
        this.$router.push({ name: 'main' })
          window.location.reload()
      }).catch(e => this.toast(e.response.data.message, 'error'))
    },
    ShowEdit(data) {
      console.log(data)
    },
    PreparePagination(p) {
      this.$refs.PaginationTemplate.page = p.current_page
      this.$refs.PaginationTemplate.last_page = p.last_page
      this.$refs.PaginationTemplate.results_info = `Результаты ${p.from}-${p.to} из ${p.total}`
      this.$refs.PaginationTemplate.PrepareAvailablePages()
    },
  }
}
</script>
