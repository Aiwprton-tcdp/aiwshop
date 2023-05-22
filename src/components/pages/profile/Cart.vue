<style></style>

<template>
<Navigation ref="nav" />
  
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
    <tbody v-for="g in goods">
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
      <button @click="GoToPay()" class="text-green-400">
        Перейти к оплате
      </button>
    </div>
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

    return {
      loading,
      toast,
    }
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
