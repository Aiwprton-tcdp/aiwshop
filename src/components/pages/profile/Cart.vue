<style></style>

<template>
<Navigation ref="nav" />

  
<!-- drawer init and toggle -->
<!-- <div class="text-center">
   <button class="overflow-y-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example">
   Show top drawer
   </button>
</div> -->

<div v-if="goods.length == 0" class="flex items-center justify-center">
  <label class="ml-2 text-sm font-medium text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white">
    Корзина пуста
  </label>
</div>

<div v-else class="space-y-4">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Id</th>
        <th scope="col" class="px-6 py-3">Название</th>
        <th scope="col" class="px-6 py-3">Цена</th>
        <th scope="col" class="px-6 py-3">Дата создания</th>
        <th scope="col" class="px-6 py-3">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="g in goods" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py-4">{{ g.id }}</td>
        <td scope="row" class="px-6 py-4 whitespace-nowrap">{{ g.name }}</td>
        <td class="px-6 py-4">${{ g.price }}</td>
        <td class="px-6 py-4">{{ FormatDate(g.created_at) }}</td>
        <td class="px-6 py-4">
          <button @click="Delete(g.id)">
            <span class="w-5 h-5 text-red-600">✖</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  
  <div class="flex justify-between">
    <div>
      <span class="text-gray-900 dark:text-white">Сумма: ${{ sum }}</span>
    </div>
    
    <div class="flex space-x-4">
      <button @click="ReportGenerate()" class="text-blue-400">
        Выгрузить отчёт
      </button>
      <button @click="DeleteAll()" class="text-red-600">
        Очистить корзину
      </button>
      <button @click="GoToPay()" class="text-green-400" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example">
        Перейти к оплате
      </button>
    </div>
  </div>

<!-- drawer component -->
<div id="drawer-top-example" class="fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-top-label">
    <h5 id="drawer-top-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Top drawer</h5>
    <button type="button" data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close menu</span>
    </button>
    <p class="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a href="#" class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.</p>
   <a href="#" class="px-4 py-2 mr-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
   <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
</div>

</div>
</template>

<script>
import { inject } from 'vue'
import Cookies from 'js-cookie'
import Navigation from '@/components/templates/Navigation.vue'
import { DefaultDate } from '@/utils/DateFormatter.js'

export default {
  name: 'Profile_Cart',
  components: {
    Navigation,
  },
  data() {
    return {
      goods: Array(),
      sum: Number(),
    }
  },
  setup() {
    const loading = inject('loading')
    const toast = inject('createToast')

    return { loading, toast }
  },
  mounted() {
    this.$refs.nav.data = ['Корзина']
    this.GetGoods()
  },
  methods: {
    GetGoods() {
      this.loading = true

      this.ax.get('cart').then(r => {
        this.goods = r.data.data

        if (this.goods.length == 0) {
          this.GetGoodsFromCookies()
          return
        }

        this.sum = this.goods.reduce((a, o) => a + Number(o.price), 0)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    GetGoodsFromCookies() {
      this.loading = true

      let cart_data = Cookies.get('cart')
      let d = cart_data == null ? [] : JSON.parse(cart_data)

      if (d == 0) {
        this.loading = false
        return
      }

      let url = `goods?page=1
        &cart_ids=${d}
        &limit=100`
      
      this.ax.get(url).then(r => {
        this.goods = r.data.data.data
        this.sum = this.goods.reduce((a, o) => a + Number(o.price), 0)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    Delete(id) {
      this.loading = true

      this.ax.delete(`cart/${id}`).then(r => {
        console.log(r)
        // this.goods = r.data.data

        this.DeleteFromCookies(id)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    DeleteFromCookies(id) {
      let cart_data = Cookies.get('cart')
      let d = cart_data == null ? [] : JSON.parse(cart_data)

      const index = d.indexOf(id)
      if (index < 0) return

      this.goods.splice(index, 1)
      d.splice(index, 1)
      Cookies.set('cart', JSON.stringify(d))
    },
    DeleteAll() {
      const clear = []
      Cookies.set('cart', JSON.stringify(clear))
      this.goods = clear
    },
    ReportGenerate() {
      this.loading = true
      // console.log('ReportGenerate')

      let cart_data = Cookies.get('cart')
      let d = cart_data == null ? [] : JSON.parse(cart_data)

      if (d == 0) {
        this.loading = false
        return
      }

      let url = `goods?page=1
        &cart_ids=${d}
        &is_file=1
        &limit=100`
      // let url = `report`

      this.ax.get(url, {
        responseType: 'blob'
      }).then(r => {
        console.log(r.data)
        this.downloadURI(r.data)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    downloadURI(data) {
      let link = document.createElement("a")
      const url = window.URL.createObjectURL(data)
      link.href = url
      // link.download = 'file.xlsx' // data.name //
      document.body.appendChild(link)
      link.click()
    },
    GoToPay() {
      console.log('GoToPay')
    },
    FormatDate(date) {
      return DefaultDate(date)
    },
  }
}
</script>
