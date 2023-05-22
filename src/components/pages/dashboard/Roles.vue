<style scoped></style>

<template>
<div class="flex text-sm sm:text-base">
  <Navigation ref="nav" />
  
  <div class="flex items-center">
    <a href="" class="flex text-white hover:text-gray-100 bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
      <span class="font-bold">&#10010;&nbsp;&nbsp;</span>Роль
    </a>
  </div>
</div>
  
<div class="w-full overflow-x-auto">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Id</th>
        <th scope="col" class="px-6 py-3">Название</th>
        <th scope="col" class="px-6 py-3">Дата создания</th>
        <th scope="col" class="px-6 py-3">Дата изменения</th>
      </tr>
    </thead>
    <tbody v-for="r in roles">
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
          {{ r.id }}
        </td>
        <td class="px-6 py-4">{{ r.name }}</td>
        <td class="px-6 py-4">{{ r.created_at }}</td>
        <td class="px-6 py-4">{{ r.updated_at }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { inject } from 'vue'
import Navigation from '@/components/pages/dashboard/templates/Navigation.vue'

export default {
  name: 'D_Roles',
  components: {
    Navigation,
  },
  data() {
    return {
      roles: Array(),
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
  mounted: function() {
    this.$refs.nav.data = ['Роли']
    this.GetRoles()
  },
  methods: {
    GetRoles() {
      this.loading = true

      this.ax.get('roles')
        .then(response => {
          let data = response.data.data
          this.roles = data
        }).catch(e => {
          this.toast(e.response.data.message, 'error')
        }).finally(() => this.loading = false)
    },
  }
}
</script>
