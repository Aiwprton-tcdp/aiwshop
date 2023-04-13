<style></style>

<template>
<div class="max-w-sm mx-2 my-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <div class="flex flex-col justify-between">
    <span class="text-gray-900 dark:text-white">id: {{ data.id }}</span>
    <span class="text-gray-900 dark:text-white">buyer: {{ data.buyer }}</span>
    <span class="text-3xl font-bold text-gray-900 dark:text-white">${{ data.price }}</span>
    <span class="text-gray-900 dark:text-white">{{ data.discount }}%</span>
    <span class="text-gray-900 dark:text-white">{{ data.is_returned }}</span>
    <span class="text-gray-900 dark:text-white">{{ FormatDate(data.created_at) }}</span>
  </div>
</div>
</template>


<script>
import { DefaultDate } from '@/utils/DateFormatter.js'

export default {
  name: "PurchaseCard",
  props: {
    data: Object()
  },
  // mounted: function() {
  //   this.isSupporter = this.$page.props.isSupporter;
  //   this.group_name = this.groups[0];
  // },
  // computed: {
  //   isFolder() {
  //     return this.data.children && this.data.children.length;
  //   }
  // },
  methods: {
    FormatDate(date) {
      return DefaultDate(date)
    },
  }
}
</script>
