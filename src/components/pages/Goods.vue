<style scoped></style>

<template>
<div class="container mx-auto flex flex-wrap">
  <GoodCard v-for="g in goods" :data="g" />
</div>

<button v-if="this.goods.length > 0" @click="GetGoods()" type="button">
  Ещё
</button>
</template>

<script>
import { inject } from 'vue'
import GoodCard from '@/components/templates/GoodCard.vue'

export default {
  name: 'Goods',
  components: {
    GoodCard
  },
  data() {
    return {
      goods: Array(),
      page: Number(1),
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
    this.GetGoods()
  },
  methods: {
    GetGoods() {
      this.loading = true

      let url = `goods?page=${this.page}
        &limit=5`

      this.ax.get(url)
        .then(response => {
          this.goods = this.page++ == 1
            ? response.data.data.data
            : Array.prototype.concat(this.goods, response.data.data.data)

            this.goods.forEach(g => g.rating = parseInt(g.price) > 5 ? 5 : parseInt(g.price))
        }).catch(e => {
          this.toast(e.response.data.message, 'error')
        }).finally(() => this.loading = false)
    },
  }
}
</script>
