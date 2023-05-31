<style scoped></style>

<template>
<RouterView/>
<!-- <EditGood ref="EditGoodModal" /> -->
<Navigation ref="nav" />

<div class="flex justify-between my-2 gap-10 text-sm sm:text-base">
  <a href="" class="flex text-white hover:text-gray-100 bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
    <span class="font-bold">&#10010;&nbsp;&nbsp;</span>Товар
  </a>

  <!-- Filters main -->
  <div class="relative flex w-72">
    <input v-model.trim="search" @keypress.enter="Search()" id="goodsSearchButton" data-dropdown-toggle="goodsSearch" type="search" class="w-full px-5 py-2.5 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white searcher" placeholder="Введите название или id" />
    <div class="absolute top-0 right-0 flex items-center px-4 py-2.5 space-x-1">
      <button @click="Search()">
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
<!-- https://codesandbox.io/s/mpklq49wp -->
<!-- https://vue3datepicker.com/installation/ -->
<div id="goodsSearch" class="absolute w-fit p-8 z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
  <div aria-labelledby="goodsSearchButton">
    <div class="w-56">
      <VueSimpleRangeSlider
          :min="0"
          :max="100"
          v-model="price_range">
        <template #prefix="{ value }">$</template>
      </VueSimpleRangeSlider>
    </div>
    <div class="w-56 mt-20 z-100">
      <div class="flex items-center space-x-3">
        <label>От: </label>
        <DatePicker v-model="begin_date" />
      </div>
      <div class="flex items-center space-x-3">
        <label>До: </label>
        <DatePicker v-model="end_date" />
      </div>
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
        <th scope="col" class="px-6 py-3">Название</th>
        <th scope="col" class="px-6 py-3">Цена</th>
        <th scope="col" class="px-6 py-3">Дата создания</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="g in goods" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
          <RouterLink :to="{ name: 'good_edit', params: {id: g.id} }" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            &#x270E;
          </RouterLink>

          <!-- <button @click="ShowEdit(g.id)">&#x270E;</button> -->
          {{ g.id }}
        </td>
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ g.name }}
        </td>
        <td class="px-6 py-4">{{ g.price }}</td>
        <td class="px-6 py-4">{{ g.created_at }}</td>
      </tr>
    </tbody>
  </table>

  <Pagination ref="PaginationTemplate" @invoke="GetGoods" />
</div>
</template>

<script>
import { inject } from 'vue'
import VueSimpleRangeSlider from 'vue-simple-range-slider'
import EditGood from '@/components/pages/dashboard/modals/EditGood.vue'
import Pagination from '@/components/templates/Pagination.vue'
import Navigation from '@/components/pages/dashboard/templates/Navigation.vue'
import 'vue-simple-range-slider/css'

export default {
  name: 'D_Goods',
  components: {
    VueSimpleRangeSlider,
    EditGood,
    Pagination,
    Navigation,
    // VueDatePicker,
  },
  data() {
    return {
      goods: Array(),
      price_range: Array(),
      search: String(),
      begin_date: null,
      end_date: null,
    }
  },
  setup() {
    const loading = inject('loading')
    const toast = inject('createToast')

    return { loading, toast }
  },
  mounted() {
    this.$refs.nav.data = ['Товары']
    this.SetFilterDefaults()
    this.Search()
  },
  methods: {
    SetFilterDefaults() {
      this.search = ""
      this.price_range = [0, 100]
    },
    Search() {
      this.GetGoods()
    },
    GetGoods(page = 1, per_page_internal = 10) {
      this.loading = true

      // console.log(this.price_range)

      let url = `goods?page=${page}
        &search=${this.search}
        &min_price=${this.price_range[0]}
        &max_price=${this.price_range[1]}
        &limit=${per_page_internal}`
      
      this.ax.get(url).then(r => {
        let p = r.data.data
        this.goods = p.data
        this.PreparePagination(p)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    ShowEdit(id) {
      this.$refs.EditGoodModal.show = true
      this.$refs.EditGoodModal.id = id
      this.$refs.EditGoodModal.GetData()
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
