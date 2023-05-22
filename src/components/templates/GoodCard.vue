<style></style>

<template>
<div class="max-w-sm mx-2 my-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <img class="rounded-t-lg" src="@/assets/icons8-male-user-50.png" alt="" />
  
  <a href="/123">
    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
      {{ data.name }}
    </h5>
  </a>
  
  <div class="mt-3 mb-5">
    <StarRating :rating="data.rating"
      :star-size="18"
      :round-start-rating="false"
      :glow="2"
      glow-color="#ffd055" />
  </div>

  <div class="flex justify-between">
    <span class="text-3xl font-bold text-gray-900 dark:text-white">${{ data.price }}</span>
    <button @click="AddToCart(data.id)" class="text-white hover:text-gray-100 bg-green-400 hover:bg-green-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">Add</button>
  </div>
</div>
</template>


<script>
import { inject } from 'vue'
import Cookies from 'js-cookie'
import StarRating from 'vue-star-rating'

export default {
  name: "GoodCard",
  components: {
    StarRating
  },
  props: {
    data: Object()
  },
  setup() {
    const toast = inject('createToast')

    return { toast }
  },
  methods: {
    AddToCart(id) {
      this.loading = true

      this.ax.post('cart', {
        good_id: id,
      }).then(r => {
        if (!r.data.status) {
          this.toast(r.data?.error, 'error')
          // this.toast(r.data?.error)
          this.loading = false
          return
        }

        this.goods = r.data.data
        this.AddToCookies(id)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    AddToCookies(id) {
      let goods = Cookies.get('cart')
      let d = goods == null ? [] : JSON.parse(goods)
      d.push(id)
      console.log(d)
      Cookies.set('cart', JSON.stringify(d))
    },
  }
}
</script>
