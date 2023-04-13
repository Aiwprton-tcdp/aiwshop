<style scoped></style>

<template>
<div class="flex text-sm sm:text-base">
  <Navigation ref="nav" />
  
  <div class="flex items-center">
    <a href="" class="flex text-white hover:text-gray-100 bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
      <span class="font-bold">&#10010;&nbsp;&nbsp;</span>Role
    </a>
  </div>
</div>
  
<div class="w-full overflow-x-auto">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Nickname</th>
        <th scope="col" class="px-6 py-3">Email</th>
        <th scope="col" class="px-6 py-3">Rolename</th>
        <th scope="col" class="px-6 py-3">Created at</th>
      </tr>
    </thead>
    <tbody v-for="r in roles">
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ r.name }}
        </td>
        <td class="px-6 py-4">{{ r.name }}</td>
        <td class="px-6 py-4">{{ r.name }}</td>
        <td class="px-6 py-4">{{ r.created_at }}</td>
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
    const errored = inject('errored')
    const loading = inject('loading')
    const updateStatesData = inject('updateStatesData')

    return {
      errored,
      loading,
      updateStatesData,
    }
  },
  mounted: function() {
    this.getRoles()
    this.$refs.nav.data = ['Roles']
  },
  methods: {
    getRoles() {
      this.loading = true

      this.ax.get('roles')
        .then(response => {
          let data = response.data.data
          console.log(data)
          this.roles = data
        }).catch(error => {
          console.log(error)
          this.errored = true
        }).finally(() => this.loading = false)
    },
    FormatDate(date) {
      return new Date(date).toLocaleString("de-DE", {
        month: 'numeric',
        year: 'numeric',
        day: 'numeric',
      })
    },
  }
}
</script>
