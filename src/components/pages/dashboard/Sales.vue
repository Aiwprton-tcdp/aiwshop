<style scoped></style>

<template>
<RouterView/>
<Navigation ref="nav" />

<div class="flex justify-between my-2 text-sm sm:text-base">
  <a href="" class="flex text-white hover:text-gray-100 bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
    <span class="font-bold">&#10010;&nbsp;&nbsp;</span>Покупка
  </a>

  <!-- Filters main -->
  <div class="relative flex w-72">
    <input v-model.trim="search" id="salesSearchButton" data-dropdown-toggle="salesSearch" type="search" class="w-full px-5 py-2.5 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white searcher" placeholder="Введите по id" />
    <div class="absolute top-0 right-0 flex items-center px-4 py-2.5 space-x-1">
      <button @click="GetSales()">
        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button @click="SetFilterDefaults()">
        <span class="w-5 h-5 text-red-600">✖</span>
      </button>
    </div>
  </div>
</div>

<!-- Filters additional -->
<div id="salesSearch" class="absolute w-fit p-8 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
  <div aria-labelledby="salesSearchButton">
  <!-- class="flex w-full space-x-4 px-4"> -->
    <div class="w-56">
      <VueSimpleRangeSlider
          :min="min_price"
          :max="max_price"
          v-model="price_range">
        <template #prefix="{ value }">$</template>
      </VueSimpleRangeSlider>
    </div>

    <!-- <div>
      <label for="countries_multiple" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
      <select multiple id="countries_multiple" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose countries</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>

    <div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer">
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
      </label>
    </div> -->
  </div>
</div>


<div class="space-y-4">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Id</th>
        <th scope="col" class="px-6 py-3">Цена</th>
        <th scope="col" class="px-6 py-3">Скидка</th>
        <th scope="col" class="px-6 py-3">Дата покупки</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="g in sales" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
          {{ g.id }}
          <span v-if="g.is_returned">-</span>
        </td>
        <td class="px-6 py-4">${{ g.price }}</td>
        <td class="px-6 py-4">{{ g.discount }}%</td>
        <td class="px-6 py-4">{{ g.created_at }}</td>
      </tr>
    </tbody>
  </table>

  <Pagination ref="PaginationTemplate" @invoke="GetSales" />
</div>
</template>

<script>
import { inject } from 'vue'
import VueSimpleRangeSlider from 'vue-simple-range-slider'
import Pagination from '@/components/templates/Pagination.vue'
import Navigation from '@/components/pages/dashboard/templates/Navigation.vue'
import 'vue-simple-range-slider/css'

export default {
  name: 'D_Sales',
  components: {
    VueSimpleRangeSlider,
    Pagination,
    Navigation,
  },
  data() {
    return {
      sales: Array(),
      min_price: Number(),
      max_price: Number(),
      price_range: Array(),
      search: String(),
    }
  },
  setup() {
    const loading = inject('loading')
    const toast = inject('createToast')

    return { loading, toast }
  },
  mounted() {
    this.$refs.nav.data = ['Покупки']
    this.SetFilterDefaults()
    this.GetSales()
  },
  methods: {
    SetFilterDefaults() {
      this.search = ""
      this.min_price = 0
      this.max_price = 100
      this.price_range = [this.min_price, this.max_price]
    },
    GetSales(page = 1, per_page_internal = 10) {
      this.loading = true

      let url = `sales?page=${page}
        &id=${this.search}
        &min_price=${this.price_range[0]}
        &max_price=${this.price_range[1]}
        &limit=${per_page_internal}`
      
      this.ax.get(url).then(r => {
        let p = r.data.data
        this.sales = p.data
        this.PreparePagination(p)
      }).catch(e => {
          this.toast(e.response.data.message, 'error')
        }).finally(() => this.loading = false)
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
