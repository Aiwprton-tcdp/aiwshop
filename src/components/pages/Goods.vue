<style scoped></style>

<template>
<div class="container mx-auto flex flex-wrap">
  <GoodCard v-for="g in goods" :data="g"/>
</div>

  <button type="button" @click="GetMoreGoods()">
    <span>Ещё</span>
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
      page: Number(),
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
  mounted() {
    this.page = 1
    this.GetGoods()
  },
  methods: {
    GetGoods() {
      this.loading = true

      let url = `goods?page=${this.page}
        &limit=5`

      this.ax.get(url)
        .then(response => {
          this.goods = response.data.data.data
        }).catch(error => {
          console.log(error)
          this.errored = true
        }).finally(() => this.loading = false)
    },
    GetMoreGoods() {
      this.loading = true
      this.page++

      let url = `goods?page=${this.page}
        &limit=5`

      this.ax.get(url)
        .then(response => {
          console.log(response.data.data.data)
          this.goods = Array.prototype.concat(this.goods, response.data.data.data)
          // this.goods .push(response.data.data.data)
          console.log(this.goods)
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
