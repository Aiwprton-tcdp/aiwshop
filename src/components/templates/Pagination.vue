<style scoped></style>

<template>
<div class="flex flex-col lg:flex-row justify-between items-center">
  <label>{{ this.results_info }}</label>

  <div :class="{ invisible: is_not_necessary }" class="inline-flex">
    <input v-model="certain_page"
      type="number"
      @keyup.enter="Certain(certain_page)"
      class="w-16 p-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" />

    <button @click="Certain(certain_page)" class="px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
  
  <nav :class="{ invisible: is_not_necessary }">
    <ul class="inline-flex space-x-1 text-sm text-gray-500 bg-white">
      <li v-if="this.page > 1">
        <button @click="Previous()" class="inline-flex px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </li>
      <li v-if="!this.available_pages.includes(1)">
        <button @click="First()" class="inline-flex px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          1
        </button>
      </li>
      <li v-if="!this.available_pages.includes(1)">
        <label class="px-3 py-2 inline-block align-center text-gray-900 dark:bg-gray-800 dark:text-gray-400">
          ...
        </label>
      </li>

      <li v-for="p in available_pages">
        <label v-if="p == this.page" class="px-3 py-2 inline-block align-center text-gray-900 dark:bg-gray-800 dark:text-gray-400">{{ p }}</label>
        <button v-else @click="Certain(p)" class="px-3 py-2 text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ p }}
        </button>
      </li>

      <li v-if="!this.available_pages.includes(this.last_page)">
        <label class="px-3 py-2 inline-block align-center text-gray-900 dark:bg-gray-800 dark:text-gray-400">
          ...
        </label>
      </li>
      <li v-if="!this.available_pages.includes(this.last_page)">
        <button @click="Last()" class="inline-flex px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ this.last_page }}
        </button>
      </li>
      <li v-if="this.page < this.last_page">
        <button @click="Next()" class="inline-flex px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['invoke'],
  data() {
    return {
      page: Number(),
      last_page: Number(),
      available_pages: Array(),
      certain_page: Number(),
      results_info: String(),
      is_not_necessary: Boolean(),
    }
  },
  methods: {
    PrepareAvailablePages(count = 5) {
      if (this.last_page < 5) count = this.last_page

      this.is_not_necessary = count < 2
      if (this.is_not_necessary) return

      const minus_current = count - 1
      const half_mc = Math.floor(minus_current / 2)
      const left = this.page < count ? 1 : this.page - minus_current
      const right = this.page + minus_current < this.last_page
        ? this.page + minus_current
        : this.last_page

      let start = left
      if (this.page - left >= half_mc && right - this.page >= half_mc) {
        start = this.page - half_mc
      } else if (right - this.page < half_mc && this.last_page > count) {
        start = left + this.last_page - this.page
      }
      // const finish = start + 4 < this.last_page ? start + 4 : this.last_page

      this.available_pages = Array.from(Array(count), (e, i) => i + start)
    },
    Certain(page_number) {
      if (page_number < 1) page_number = 1
      else if (page_number > this.last_page) page_number = this.last_page

      this.page = page_number
      this.$emit('invoke', this.page)
    },
    Previous() {
      if (this.page <= 1) return

      this.page--
      this.$emit('invoke', this.page)
    },
    Next() {
      if (this.page >= this.last_page) return

      this.page++
      this.$emit('invoke', this.page)
    },
    First() {
      this.Certain(1)
    },
    Last() {
      this.Certain(this.last_page)
    },
  },
}
</script>
