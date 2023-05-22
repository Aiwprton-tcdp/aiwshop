<style scoped></style>

<template>
<Navigation ref="nav" />
    
<div class="flex items-center">
  <label class="ml-2 text-sm font-medium text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white">
    История покупок
  </label>
</div>

<div class="space-y-4">
  <div class="container mx-auto flex flex-wrap">
    <PurchaseCard v-for="s in sales" :data="s" />
  </div>

  <Pagination ref="PaginationTemplate" @invoke="GetHistory" />
</div>
</template>

<script>
import { inject } from 'vue'
import PurchaseCard from '@/components/templates/PurchaseCard.vue'
import Pagination from '@/components/templates/Pagination.vue'
import Navigation from '@/components/templates/Navigation.vue'

export default {
  name: 'Profile_History',
  components: {
    PurchaseCard,
    Pagination,
    Navigation,
  },
  data() {
    return {
      sales: Array(),
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
    this.$refs.nav.data = ['Покупки']
    this.GetHistory()
  },
  methods: {
    GetHistory(page = 1) {
      this.loading = true

      let url = `sales?page=${page}
        &buyer=${this.$route.params.id ?? this.UserData.id}
        &limit=20`
      
      this.ax.get(url).then(r => {
        let p = r.data.data
        let data = p.data
        // console.log(p)
        // console.log(data)
        // if (data.length == 0) return

        this.sales = data
        this.PreparePagination(p)
      }).catch(e => {
        this.toast(e.response.data.message, 'error')
      }).finally(() => this.loading = false)
    },
    PreparePagination(p) {
      this.$refs.PaginationTemplate.page = p.current_page
      this.$refs.PaginationTemplate.last_page = p.last_page
      this.$refs.PaginationTemplate.results_info = p.total > 0
        ? `Результаты ${p.from}-${p.to} из ${p.total}`
        : 'Нет данных'
      this.$refs.PaginationTemplate.PrepareAvailablePages()
    },
  }
}
</script>
