<style scoped></style>

<template>
<VueSidePanel v-model="show" :panel-duration="100" lock-scroll>
  <template #default>
    <div @click.self="CloseModal" class="bg-gray">
      <div class="fixed right-0 h-screen w-screen md:w-1/2 bg-white">
        <Loading v-if="this.loading" />

        <div v-else class="flex flex-col h-screen px-10 py-5 space-y-3">
          <div class="flex justify-between w-full mb-4 text-xl">
            <h2 class="font-semibold text-gray-800 leading-tight">Редактирование товара</h2>
            <span class="m-0 p-0 cursor-pointer hover:rotate-90 md:hidden" @click="CloseModal">&#10006;</span>
          </div>
          
          <div class="grow overflow-y-auto space-y-3 p-2">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
              <input v-model="new_good.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div>
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
              <input v-model="new_good.price" type="number" id="price" min="0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
          </div>

          <div class="w-full">
            <button @click="SaveData()" class="text-white m-2 bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700">Сохранить</button>
            <button @click="SetDefaults()" class="text-white m-2 bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700">Сбросить</button>
          </div>
        </div>
      </div>

      <div @click="CloseModal" class="fixed left-10 bottom-10 hidden md:block">
        <label class="cursor-pointer text-xl text-gray-300 hover:text-gray-100">Закрыть</label>
      </div>
    </div>
  </template>
</VueSidePanel>
</template>

<script>
import Loading from '@/components/templates/states/Loading.vue'

export default {
  name: 'EditGood',
  components: {
    "Loading": Loading,
  },
  data() {
    return {
      show: Boolean(),
      loading: Boolean(),
      id: Number(),
      good: Object(),
      new_good: Object(),
    }
  },
  methods: {
    GetUrl() { return `goods/${this.id}` },
    GetData() {
      if (this.id < 1) return
      this.loading = true

      this.ax.get(this.GetUrl()).then(r => {
        this.good = r.data.data
        this.SetDefaults()
      }).catch(e => {
        console.log(e)
        // this.errored = true
      }).finally(() => this.loading = false)
    },
    SaveData() {
      let request = {
        name: this.new_good.name,
        price: this.new_good.price,
      }
      if (request.name.length < 1) return
      if (request.price < 0) return
      this.loading = true

      console.log(request)
      console.log(this.new_good)
      // fetch(`http://aiwshopwebapi:8000/api/goods/${this.id}`, {
      //   data: request,
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Origin': 'http://aiwshop:5173',
      //     'Credentials': 'true',
      //   }
      // }).then(r => {
      this.ax.put(this.GetUrl(), this.new_good).then(r => {
      // this.ax.put(this.GetUrl(), { data: request }).then(r => {
        console.log(r)
        this.good = r.data.data
        console.log(this.good)
        this.SetDefaults()
      }).catch(e => {
        console.log(e)
        // this.errored = true
      }).finally(() => this.loading = false)
    },
    SetDefaults() {
      this.new_good = { ...this.good }
    },
		CloseModal() {
      this.show = false
    },
  },
}
</script>
